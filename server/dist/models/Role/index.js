"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRoleModel = exports.getRoleModel = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const db_class_1 = __importDefault(require("../../class/db.class"));
const User_1 = require("../User");
const sequelize = db_class_1.default.getInstance().sequelize;
const RoleModel = sequelize.define('td_roles', {
    label: {
        type: sequelize_1.default.STRING,
    },
    permissions: {
        type: sequelize_1.default.STRING,
    },
});
const UserRoleModel = sequelize.define('td_user_roles', {
    fkRole: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: RoleModel,
            key: 'id',
        },
    },
    fkUser: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: (0, User_1.getUserModel)(),
            key: 'id',
        },
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});
function getRoleModel() {
    return RoleModel;
}
exports.getRoleModel = getRoleModel;
function getUserRoleModel() {
    return UserRoleModel;
}
exports.getUserRoleModel = getUserRoleModel;
