import Sequelize, { DataTypes } from 'sequelize';
import MySQLDB from '../../class/db.class';
import { getUserModel } from '../User';
const sequelize = MySQLDB.getInstance().sequelize;

const TodoModel = sequelize.define('td_todos', {
    label: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING(1024),
    },
    limitDate: {
        type: Sequelize.DATE,
    },
    color: {
        type: Sequelize.STRING,
    },
    fkUser: {
        type: Sequelize.INTEGER,
        references: {
            model: getUserModel(),
            key: 'id',
        },
    },
});

export function getTodoModel() {
    return TodoModel;
}
