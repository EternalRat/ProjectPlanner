import Sequelize from 'sequelize';
import mysql from 'mysql2';

export default class MySQLDB {
    private static instance: MySQLDB;
    private static sequelizeConnection: Sequelize.Sequelize;

    private constructor() {}

    public static getInstance(): MySQLDB {
        if (!MySQLDB.instance) {
            MySQLDB.instance = new MySQLDB();
            const connection = mysql.createConnection({
                host: '',
                user: '',
                password: '',
            });
            connection.query(`CREATE DATABASE IF NOT EXISTS todolist`);
            connection.end();
            MySQLDB.sequelizeConnection = new Sequelize.Sequelize('', '', '', {
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

    public get sequelize(): Sequelize.Sequelize {
        return MySQLDB.sequelizeConnection;
    }
}
