"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const user_class_1 = __importDefault(require("~/class/user.class"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let JwtStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
class JWT {
}
exports.default = JWT;
JWT.jwtOptions = {
    secretOrKey: '69dec153dd693f69c368d31fca1258ede94fff02a03f796ca6dac9f35dc811af75d2d89e1f7f8416cedca20725bad055ed76d82621faad4e32ac4967a0d9edcc',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
JWT.jwtAuth = new JwtStrategy(JWT.jwtOptions, async function (jwt_payload, next) {
    console.info('payload received', jwt_payload);
    let user = new user_class_1.default().find(jwt_payload.id);
    if (user) {
        next(null, user);
    }
    else {
        next(null, false);
    }
});
JWT.authToken = function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (authHeader == null)
        return res.sendStatus(401);
    jsonwebtoken_1.default.verify(authHeader, JWT.jwtOptions.secretOrKey, (err, user) => {
        if (err)
            return res.sendStatus(403);
        req.user = user;
        next();
    });
};
