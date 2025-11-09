const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
    "User",
    {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        no_hp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: false,
        tableName: "user"
    }
)

module.exports = User;