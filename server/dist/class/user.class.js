"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class User {
    constructor() {
        this._user = (0, models_1.getUserModel)();
    }
    get rowid() {
        return this._rowid;
    }
    get username() {
        return this._username;
    }
    get password() {
        return this._password;
    }
    get email() {
        return this._email;
    }
    get roles() {
        return this._roles;
    }
    get status() {
        return this._status;
    }
    set rowid(rowid) {
        this._rowid = rowid;
    }
    set username(username) {
        this._username = username;
    }
    set password(password) {
        this._password = password;
    }
    set email(email) {
        this._email = email;
    }
    set status(status) {
        this._status = status;
    }
    set roles(roles) {
        this._roles = roles;
    }
    _fromModel(model) {
        this._rowid = model.get('id');
        this._username = model.get('username');
        this._password = model.get('password');
        this._email = model.get('email');
        this._status = model.get('status');
    }
    fromPurData(username, password, email, status, rowid = '') {
        this._username = username;
        this._password = password;
        this._email = email;
        this._status = status;
        this._rowid = rowid;
    }
    async create() {
        return await this._user.create({
            username: this._username,
            password: this._password,
            email: this._email,
            status: 0,
        });
    }
    async clone() {
        return await this._user.create({
            username: this._username,
            password: this._password,
            email: this._email,
            status: this._status,
        });
    }
    async find(id) {
        let model = await this._user.findOne({
            where: {
                id: id,
            },
        });
        if (!model)
            return null;
        this._fromModel(model);
        return model;
    }
    async findByEmail(email, password) {
        if (password) {
            let model = await this._user.findOne({
                where: {
                    email: email,
                    password: password,
                },
            });
            if (!model)
                return null;
            this._fromModel(model);
            return model;
        }
        let model = await this._user.findOne({
            where: {
                email: email,
            },
        });
        if (!model)
            return null;
        this._fromModel(model);
        return model;
    }
    async findByUsername(username) {
        let model = await this._user.findOne({
            where: {
                username: username,
            },
        });
        if (!model)
            return null;
        this._fromModel(model);
        return model;
    }
    async findAll() {
        return await this._user.findAll();
    }
    async update() {
        return await this._user.update({
            email: this._email,
            username: this._username,
            password: this._password,
            roles: this._roles,
        }, {
            where: {
                id: this._rowid,
            },
        });
    }
    async delete() {
        return await this._user.destroy({
            where: {
                id: this._rowid,
            },
        });
    }
    async isMailRegistered(email) {
        let model = await this._user.findOne({
            where: {
                email: email,
            },
        });
        if (!model)
            return false;
        return true;
    }
    async isUsernameRegistered(username) {
        let model = await this._user.findOne({
            where: {
                username: username,
            },
        });
        if (!model)
            return false;
        return true;
    }
}
exports.default = User;
