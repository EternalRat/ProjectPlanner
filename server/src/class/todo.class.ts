import MySQLDB from './db.class';
import Sequelize, { Model, Op } from 'sequelize';
import { getTodoModel } from '../models';

export default class Todo {
    private _Todo = getTodoModel();
    private _rowid: string;
    private _label: string;
    private _description: string;
    private _limitDate: string;
    private _color: string;
    private _fkUser: number;

    constructor() {}

    public get rowid() {
        return this._rowid;
    }

    public get label() {
        return this._label;
    }

    public get description() {
        return this._description;
    }

    public get limitDate() {
        return this._limitDate;
    }

    public get color() {
        return this._color;
    }

    public get fkUser() {
        return this._fkUser;
    }

    public set rowid(rowid: string) {
        this._rowid = rowid;
    }

    public set label(label: string) {
        this._label = label;
    }

    public set description(description: string) {
        this._description = description;
    }

    public set limitDate(limitDate: string) {
        this._limitDate = limitDate;
    }

    public set fkUser(fkUser: number) {
        this._fkUser = fkUser;
    }

    public set color(color: string) {
        this._color = color;
    }

    private _fromModel(model: Sequelize.Model<any, any>) {
        this._rowid = model.get('rowid') as string;
        this._label = model.get('label') as string;
        this._description = model.get('description') as string;
        this._limitDate = model.get('limitDate') as string;
        this._color = model.get('color') as string;
        this._fkUser = model.get('fkUser') as number;
    }

    public fromPurData(
        label: string,
        description: string,
        limitDate: string,
        color: string,
        fkUser: number,
        rowid: string = '',
    ) {
        this._label = label;
        this._description = description;
        this._limitDate = limitDate;
        this._color = color;
        this._fkUser = fkUser;
        this._rowid = rowid;
    }

    public async create() {
        return await this._Todo.create({
            label: this._label,
            description: this._description,
            limitDate: this._limitDate,
            color: this._color,
            fkUser: 0,
        });
    }

    public async clone() {
        return await this._Todo.create({
            label: this._label,
            description: this._description,
            limitDate: this._limitDate,
            color: this._color,
            fkUser: this._fkUser,
        });
    }

    public async find(id: string, userId: string) {
        let model = await this._Todo.findOne({
            where: {
                id: id,
                fkUser: userId,
            },
        });
        if (!model) return null;
        this._fromModel(model);
        return model;
    }

    public async findByUser(id: string) {
        let model = await this._Todo.findAll({
            where: {
                fkUser: id,
            },
        });
        if (!model) return null;
        return model;
    }

    public async findAll() {
        return await this._Todo.findAll();
    }

    public async update() {
        return await this._Todo.update(
            {
                label: this._label,
                description: this._description,
                limitDate: this._limitDate,
                color: this._color,
            },
            {
                where: {
                    rowid: this._rowid,
                },
            },
        );
    }

    public async delete(id: string, userId: string) {
        return await this._Todo.destroy({
            where: {
                rowid: this._rowid,
            },
        });
    }
}
