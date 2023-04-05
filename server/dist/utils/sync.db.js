"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
async function syncDB() {
    await (0, models_1.getUserModel)().sync();
    await (0, models_1.getRoleModel)().sync();
    await (0, models_1.getUserRoleModel)().sync();
    await (0, models_1.getTodoModel)().sync();
    await (0, models_1.getVerificationModel)().sync();
}
exports.default = syncDB;
