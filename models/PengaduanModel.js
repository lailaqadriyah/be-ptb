const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Pengaduan = sequelize.define(
    "Pengaduan",
    {
        id_pengaduan: {
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
        alamat: {                     
            type: DataTypes.STRING,
            allowNull: true
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
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: "pengaduan"
    }
)

module.exports = Pengaduan;
