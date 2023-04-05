"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_class_1 = __importDefault(require("../../../class/user.class"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../../../models");
const crypto_1 = __importDefault(require("crypto"));
const jwt_class_1 = __importDefault(require("~/class/jwt.class"));
const router = express_1.default.Router();
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        let user = new user_class_1.default();
        let userModel = await user.findByEmail(email);
        if (!userModel) {
            res.status(404).json({ msg: 'No such user found with this email' });
            return;
        }
        if (await bcrypt_1.default.compare(password, userModel === null || userModel === void 0 ? void 0 : userModel.get('password'))) {
            let verifiedModel = await (0, models_1.getVerificationModel)().findOne({
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
            let token = jsonwebtoken_1.default.sign({
                id: userModel.get('id'),
                username: userModel.get('username'),
                email: userModel.get('email'),
            }, jwt_class_1.default.jwtOptions.secretOrKey, {
                expiresIn: '6h',
            });
            res.json({ msg: 'ok', token: token });
        }
        else {
            res.status(400).json({ code: 0x4 });
        }
    }
    else if (!password && email) {
        res.status(400).json({ code: 0x2 });
    }
    else if (!email && password) {
        res.status(400).json({ code: 0x1 });
    }
    else {
        res.status(400).json({ code: 0x3 });
    }
});
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    if (!username && !password && !email) {
        res.status(400).json({ code: 0x4 });
        return;
    }
    else if (!username) {
        res.status(400).json({ code: 0x3 });
        return;
    }
    else if (!password) {
        res.status(400).json({ code: 0x2 });
        return;
    }
    else if (!email) {
        res.status(400).json({ code: 0x1 });
        return;
    }
    let user = new user_class_1.default();
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
    const id = crypto_1.default.randomBytes(16).toString('hex');
    (0, models_1.getVerificationModel)().create({
        fkUser: userModel.get('id'),
        verifiedId: id,
        verified: false,
    });
    res.send({ msg: 'Created successfully' });
});
router.get('/', jwt_class_1.default.authToken, (req, res) => {
    if (req.user)
        res.send(req.user);
    else
        res.sendStatus(401);
});
exports.default = router;
