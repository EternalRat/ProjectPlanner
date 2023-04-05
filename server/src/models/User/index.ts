import Sequelize from 'sequelize';
import MySQLDB from '../../class/db.class';
import bcrypt from 'bcrypt';
const sequelize = MySQLDB.getInstance().sequelize;

let UserModel = sequelize.define('td_users', {
    username: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    status: {
        type: Sequelize.INTEGER,
    },
});

let VerificationModel = sequelize.define(
    'td_users_verifications',
    {
        fkUser: {
            type: Sequelize.INTEGER,
            references: {
                model: UserModel,
                key: 'id',
            },
        },
        verifiedId: {
            type: Sequelize.STRING,
        },
        verified: {
            type: Sequelize.BOOLEAN,
        },
    },
    {
        timestamps: false,

        createdAt: false,

        updatedAt: false,
    },
);

UserModel.beforeCreate(async (user) => {
    try {
        const hash = await bcrypt.hash(user.get('password') as string, 10);
        user.set('password', hash);
    } catch (err) {
        throw new Error();
    }
});

UserModel.beforeUpdate(async (user) => {
    try {
        const hash = await bcrypt.hash(user.get('password') as string, 10);
        user.set('password', hash);
    } catch (err) {
        throw new Error();
    }
});

export function getUserModel() {
    return UserModel;
}

export function getVerificationModel() {
    return VerificationModel;
}
