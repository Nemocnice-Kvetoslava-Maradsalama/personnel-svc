import { Sequelize } from 'sequelize/types';
import { DataTypes } from 'sequelize';

export default (sequelize: Sequelize) => sequelize.define('Nurse', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {});