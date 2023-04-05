import Sequelize, { DataTypes } from 'sequelize';
import MySQLDB from '../../class/db.class';
import { getUserModel } from '../User';
const sequelize = MySQLDB.getInstance().sequelize;

const RoleModel = sequelize.define('td_roles', {
    label: {
        type: Sequelize.STRING,
    },
    permissions: {
        type: Sequelize.STRING,
    },
});

const UserRoleModel = sequelize.define(
    'td_user_roles',
    {
        fkRole: {
            type: Sequelize.INTEGER,
            references: {
                model: RoleModel,
                key: 'id',
            },
        },
        fkUser: {
            type: Sequelize.INTEGER,
            references: {
                model: getUserModel(),
                key: 'id',
            },
        },
    },
    {
        timestamps: false,

        createdAt: false,

        updatedAt: false,
    },
);

export function getRoleModel() {
    return RoleModel;
}

export function getUserRoleModel() {
    return UserRoleModel;
}
