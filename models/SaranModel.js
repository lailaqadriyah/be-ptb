const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Saran = sequelize.define(
    "Saran",
    {
        id_saran: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        judul: {
            type: DataTypes.STRING,
            allowNull: false
        },
        deskripsi: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: true
        }

    },
    {
        timestamps: false,
        tableName: "saran"
    }
)

module.exports = Saran;