import Sequelize from 'sequelize';
import { getUserModel } from '../models';
import bcrypt from 'bcrypt';

export default class User {
    private _user = getUserModel();
    private _rowid: string;
    private _username: string;
    private _password: string;
    private _email: string;
    private _status: number;
    private _roles: Array<Sequelize.ModelCtor<Sequelize.Model<any, any>>>;

    constructor() {}

    public get rowid() {
        return this._rowid;
    }

    public get username() {
        return this._username;
    }

    public get password() {
        return this._password;
    }

    public get email() {
        return this._email;
    }

    public get roles() {
        return this._roles;
    }

    public get status() {
        return this._status;
    }

    public set rowid(rowid: string) {
        this._rowid = rowid;
    }

    public set username(username: string) {
        this._username = username;
    }

    public set password(password: string) {
        this._password = password;
    }

    public set email(email: string) {
        this._email = email;
    }

    public set status(status: number) {
        this._status = status;
    }

    public set roles(
        roles: Array<Sequelize.ModelCtor<Sequelize.Model<any, any>>>,
    ) {
        this._roles = roles;
    }

    private _fromModel(model: Sequelize.Model<any, any>) {
        this._rowid = model.get('id') as string;
        this._username = model.get('username') as string;
        this._password = model.get('password') as string;
        this._email = model.get('email') as string;
        this._status = model.get('status') as number;
    }

    public fromPurData(
        username: string,
        password: string,
        email: string,
        status: number,
        rowid: string = '',
    ) {
        this._username = username;
        this._password = password;
        this._email = email;
        this._status = status;
        this._rowid = rowid;
    }

    public async create() {
        return await this._user.create({
            username: this._username,
            password: this._password,
            email: this._email,
            status: 0,
        });
    }

    public async clone() {
        return await this._user.create({
            username: this._username,
            password: this._password,
            email: this._email,
            status: this._status,
        });
    }

    public async find(id: string) {
        let model = await this._user.findOne({
            where: {
                id: id,
            },
        });
        if (!model) return null;
        this._fromModel(model);
        return model;
    }

    public async findByEmail(email: string, password?: string) {
        if (password) {
            let model = await this._user.findOne({
                where: {
                    email: email,
                    password: password,
                },
            });
            if (!model) return null;
            this._fromModel(model);
            return model;
        }
        let model = await this._user.findOne({
            where: {
                email: email,
            },
        });
        if (!model) return null;
        this._fromModel(model);
        return model;
    }

    public async findByUsername(username: string) {
        let model = await this._user.findOne({
            where: {
                username: username,
            },
        });
        if (!model) return null;
        this._fromModel(model);
        return model;
    }

    public async findAll() {
        return await this._user.findAll();
    }

    public async update() {
        return await this._user.update(
            {
                email: this._email,
                username: this._username,
                password: this._password,
                roles: this._roles,
            },
            {
                where: {
                    id: this._rowid,
                },
            },
        );
    }

    public async delete() {
        return await this._user.destroy({
            where: {
                id: this._rowid,
            },
        });
    }

    public async isMailRegistered(email: string) {
        let model = await this._user.findOne({
            where: {
                email: email,
            },
        });
        if (!model) return false;
        return true;
    }

    public async isUsernameRegistered(username: string) {
        let model = await this._user.findOne({
            where: {
                username: username,
            },
        });
        if (!model) return false;
        return true;
    }
}
