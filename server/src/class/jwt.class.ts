import passportJWT from 'passport-jwt';
import User from '~/class/user.class';
import jwt from 'jsonwebtoken';
let JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

export default class JWT {
    public static jwtOptions = {
        secretOrKey:
            '69dec153dd693f69c368d31fca1258ede94fff02a03f796ca6dac9f35dc811af75d2d89e1f7f8416cedca20725bad055ed76d82621faad4e32ac4967a0d9edcc',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };

    public static jwtAuth = new JwtStrategy(JWT.jwtOptions, async function (
        jwt_payload,
        next,
    ) {
        console.info('payload received', jwt_payload);
        let user = new User().find(jwt_payload.id);

        if (user) {
            next(null, user);
        } else {
            next(null, false);
        }
    });

    public static authToken = function authToken(
        req: any,
        res: any,
        next: any,
    ) {
        const authHeader = req.headers['authorization'];
        if (authHeader == null) return res.sendStatus(401);

        jwt.verify(
            authHeader,
            JWT.jwtOptions.secretOrKey,
            (err: any, user: any) => {
                if (err) return res.sendStatus(403);
                req.user = user;
                next();
            },
        );
    };
}
