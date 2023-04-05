"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const mysql2_1 = __importDefault(require("mysql2"));
class MySQLDB {
    constructor() { }
    static getInstance() {
        if (!MySQLDB.instance) {
            MySQLDB.instance = new MySQLDB();
            const connection = mysql2_1.default.createConnection({
                host: '',
                user: '',
                password: '',
            });
            connection.query(`CREATE DATABASE IF NOT EXISTS todolist`);
            connection.end();
            MySQLDB.sequelizeConnection = new sequelize_1.default.Sequelize('', '', '', {
                host: '',
                dialect: 'mysql',
            });
            MySQLDB.sequelizeConnection
                .authenticate()
                .then(() => {
                console.info('Sequelize initialized.');
            })
                .catch(() => {
                console.error('Sequelize failed to initialize.');
            });
        }
        return MySQLDB.instance;
    }
    get sequelize() {
        return MySQLDB.sequelizeConnection;
    }
}
exports.default = MySQLDB;
