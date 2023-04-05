"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class Todo {
    constructor() {
        this._Todo = (0, models_1.getTodoModel)();
    }
    get rowid() {
        return this._rowid;
    }
    get label() {
        return this._label;
    }
    get description() {
        return this._description;
    }
    get limitDate() {
        return this._limitDate;
    }
    get color() {
        return this._color;
    }
    get fkUser() {
        return this._fkUser;
    }
    set rowid(rowid) {
        this._rowid = rowid;
    }
    set label(label) {
        this._label = label;
    }
    set description(description) {
        this._description = description;
    }
    set limitDate(limitDate) {
        this._limitDate = limitDate;
    }
    set fkUser(fkUser) {
        this._fkUser = fkUser;
    }
    set color(color) {
        this._color = color;
    }
    _fromModel(model) {
        this._rowid = model.get('rowid');
        this._label = model.get('label');
        this._description = model.get('description');
        this._limitDate = model.get('limitDate');
        this._color = model.get('color');
        this._fkUser = model.get('fkUser');
    }
    fromPurData(label, description, limitDate, color, fkUser, rowid = '') {
        this._label = label;
        this._description = description;
        this._limitDate = limitDate;
        this._color = color;
        this._fkUser = fkUser;
        this._rowid = rowid;
    }
    async create() {
        return await this._Todo.create({
            label: this._label,
            description: this._description,
            limitDate: this._limitDate,
            color: this._color,
            fkUser: 0,
        });
    }
    async clone() {
        return await this._Todo.create({
            label: this._label,
            description: this._description,
            limitDate: this._limitDate,
            color: this._color,
            fkUser: this._fkUser,
        });
    }
    async find(id, userId) {
        let model = await this._Todo.findOne({
            where: {
                id: id,
                fkUser: userId,
            },
        });
        if (!model)
            return null;
        this._fromModel(model);
        return model;
    }
    async findByUser(id) {
        let model = await this._Todo.findAll({
            where: {
                fkUser: id,
            },
        });
        if (!model)
            return null;
        return model;
    }
    async findAll() {
        return await this._Todo.findAll();
    }
    async update() {
        return await this._Todo.update({
            label: this._label,
            description: this._description,
            limitDate: this._limitDate,
            color: this._color,
        }, {
            where: {
                rowid: this._rowid,
            },
        });
    }
    async delete(id, userId) {
        return await this._Todo.destroy({
            where: {
                rowid: this._rowid,
            },
        });
    }
}
exports.default = Todo;
