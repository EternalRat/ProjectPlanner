import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../../../class/user.class';
import bcrypt from 'bcrypt';
import { getVerificationModel } from '../../../models';
import crypto from 'crypto';
import JWT from '~/class/jwt.class';
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        let user = new User();
        let userModel = await user.findByEmail(email);
        if (!userModel) {
            res.status(404).json({ msg: 'No such user found with this email' });
            return;
        }
        if (
            await bcrypt.compare(password, userModel?.get('password') as string)
        ) {
            let verifiedModel = await getVerificationModel().findOne({
                where: {
                    fkUser: userModel.get('id'),
                },
            });
            if (!verifiedModel) {
                res.status(403).json({ code: 0x1 });
                return;
            }
            /* if (verifiedModel.get("verified") as boolean === false) {
                res.status(403).json({ code: 0x2 });
                return;
            } */
            let token = jwt.sign(
                {
                    id: userModel.get('id') as string,
                    username: userModel.get('username') as string,
                    email: userModel.get('email') as string,
                },
                JWT.jwtOptions.secretOrKey,
                {
                    expiresIn: '6h',
                },
            );
            res.json({ msg: 'ok', token: token });
        } else {
            res.status(400).json({ code: 0x4 });
        }
    } else if (!password && email) {
        res.status(400).json({ code: 0x2 });
    } else if (!email && password) {
        res.status(400).json({ code: 0x1 });
    } else {
        res.status(400).json({ code: 0x3 });
    }
});

router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    if (!username && !password && !email) {
        res.status(400).json({ code: 0x4 });
        return;
    } else if (!username) {
        res.status(400).json({ code: 0x3 });
        return;
    } else if (!password) {
        res.status(400).json({ code: 0x2 });
        return;
    } else if (!email) {
        res.status(400).json({ code: 0x1 });
        return;
    }
    let user = new User();
    if ((await user.isMailRegistered(email)) === true) {
        res.status(403).json({ code: 0x2 });
        return;
    }
    if ((await user.isUsernameRegistered(username)) === true) {
        res.status(403).json({ code: 0x1 });
        return;
    }
    user.fromPurData(username, password, email, 0);
    let userModel = await user.create();
    const id = crypto.randomBytes(16).toString('hex');
    getVerificationModel().create({
        fkUser: userModel.get('id'),
        verifiedId: id,
        verified: false,
    });
    res.send({ msg: 'Created successfully' });
});

router.get('/', JWT.authToken, (req, res) => {
    if (req.user) res.send(req.user);
    else res.sendStatus(401);
});

export default router;
