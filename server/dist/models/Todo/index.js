"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodoModel = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const db_class_1 = __importDefault(require("../../class/db.class"));
const User_1 = require("../User");
const sequelize = db_class_1.default.getInstance().sequelize;
const TodoModel = sequelize.define('td_todos', {
    label: {
        type: sequelize_1.default.STRING,
    },
    description: {
        type: sequelize_1.default.STRING(1024),
    },
    limitDate: {
        type: sequelize_1.default.DATE,
    },
    color: {
        type: sequelize_1.default.STRING,
    },
    fkUser: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: (0, User_1.getUserModel)(),
            key: 'id',
        },
    },
});
function getTodoModel() {
    return TodoModel;
}
exports.getTodoModel = getTodoModel;
