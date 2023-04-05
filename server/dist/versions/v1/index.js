"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const todo_1 = __importDefault(require("./todo"));
const router = express_1.default.Router();
router.use('/auth', auth_1.default);
router.use('/todo', todo_1.default);
exports.default = router;
