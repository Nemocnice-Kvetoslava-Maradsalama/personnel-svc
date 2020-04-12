import { Sequelize } from 'sequelize/types';
import { DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => sequelize.define('Account', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password_salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true
    },
}, {});