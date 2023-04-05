"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVerificationModel = exports.getUserModel = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const db_class_1 = __importDefault(require("../../class/db.class"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize = db_class_1.default.getInstance().sequelize;
let UserModel = sequelize.define('td_users', {
    username: {
        type: sequelize_1.default.STRING,
        unique: true,
    },
    password: {
        type: sequelize_1.default.STRING,
    },
    email: {
        type: sequelize_1.default.STRING,
        unique: true,
    },
    status: {
        type: sequelize_1.default.INTEGER,
    },
});
let VerificationModel = sequelize.define('td_users_verifications', {
    fkUser: {
        type: sequelize_1.default.INTEGER,
        references: {
            model: UserModel,
            key: 'id',
        },
    },
    verifiedId: {
        type: sequelize_1.default.STRING,
    },
    verified: {
        type: sequelize_1.default.BOOLEAN,
    },
}, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
});
UserModel.beforeCreate(async (user) => {
    try {
        const hash = await bcrypt_1.default.hash(user.get('password'), 10);
        user.set('password', hash);
    }
    catch (err) {
        throw new Error();
    }
});
UserModel.beforeUpdate(async (user) => {
    try {
        const hash = await bcrypt_1.default.hash(user.get('password'), 10);
        user.set('password', hash);
    }
    catch (err) {
        throw new Error();
    }
});
function getUserModel() {
    return UserModel;
}
exports.getUserModel = getUserModel;
function getVerificationModel() {
    return VerificationModel;
}
exports.getVerificationModel = getVerificationModel;
