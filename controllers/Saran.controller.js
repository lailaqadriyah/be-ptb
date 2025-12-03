const Saran = require('../models/SaranModel');

const findAllSaran = async (req, res) => {
    try {
        const datasaran = await Saran.findAll();
        res.json(datasaran);
    } catch (error) {
        console.log(error);
    }
}

const insertSaran = async (req, res) => {
    try {
        const { id_saran, judul, deskripsi, foto, latitude, longitude } = req.body;

        const newSaran = await Saran.create({
            id_saran,
            judul,
            deskripsi,
            foto,
            latitude,
            longitude,
        });
        res.json(newSaran);
    } catch (error) {
        console.log(error);
        res
        .status(error.statusCode || 500)
        .json(error.message || error.message || "Internal Server Error");

    }
};

const updateSaran = async (req, res) => {
    try {
        const idSaran = req.params.id;
        const { id_saran } = req.params.id;
        const { judul, deskripsi, foto, latitude, longitude } = req.body;
        const existingData = await Saran.findOne({
            where: {
                id_saran: id_saran,
            },
        });
        existingData.judul = judul;
        existingData.deskripsi = deskripsi;
        existingData.foto = foto;
        existingData.latitude = latitude;
        existingData.longitude = longitude;

        await existingData.save();
        res.json(existingData);
    } catch (error) {
        console.log(error);
        res
        .status(error.statusCode || 500)
        .json(error.message || error.message || "Internal server error,");
    }
};

const deleteSaran = async (req, res) => {
    try {
        const { id_saran } = req.params.id;
        const existingData = await Saran.findOne
    }
}
module.exports = {
    findAllSaran,
    insertSaran,
    updateSaran,
    deleteSaran,
};

