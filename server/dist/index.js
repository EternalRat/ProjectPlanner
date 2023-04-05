"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const versions_1 = __importDefault(require("./versions"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const jwt_class_1 = __importDefault(require("./class/jwt.class"));
const sync_db_1 = __importDefault(require("./utils/sync.db"));
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)('secretcode'));
app.use(passport_1.default.initialize());
passport_1.default.use(jwt_class_1.default.jwtAuth);
app.use('/api', versions_1.default);
app.listen(8080, async () => {
    console.info('app listening on port 8080');
    await (0, sync_db_1.default)();
});
