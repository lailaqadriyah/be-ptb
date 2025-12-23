const Pengaduan = require('../models/PengaduanModel');

const toPengaduanResponse = (item) => {
    const data = item && item.toJSON ? item.toJSON() : item;
    return {
        id_pengaduan: data.id_pengaduan,
        judul: data.judul,
        deskripsi: data.deskripsi,
        foto: data.foto ?? null,
        latitude: data.latitude ?? null,
        longitude: data.longitude ?? null,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    };
};

// Fungsi untuk mengambil semua data pengaduan
const findAllPengaduan = async (req, res) => {
    try {
        const datapengaduan = await Pengaduan.findAll();

        res.json(datapengaduan.map(toPengaduanResponse));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Fungsi untuk memasukkan data pengaduan baru
const insertPengaduan = async (req, res) => {
    try {
        const { 
            judul, 
            deskripsi, 
            alamat,        
            latitude, 
            longitude 
        } = req.body;

        const fotoPath = req.file ? 'uploads/' + req.file.filename : null;

        const newPengaduan = await Pengaduan.create({
            judul,
            deskripsi,
            alamat,        
            foto: fotoPath,
            latitude,
            longitude,
        });

        res.json(toPengaduanResponse(newPengaduan));
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: error.message || "Internal Server Error", error: error });
    }
};

// Fungsi untuk memperbarui data pengaduan
const updatePengaduan = async (req, res) => {
    try {
        const idPengaduan = req.params.id;
        const { 
            judul, 
            deskripsi, 
            alamat,        
            latitude, 
            longitude 
        } = req.body;
        
        const existingData = await Pengaduan.findOne({
            where: {
                id_pengaduan: idPengaduan,
            },
        });

        if (!existingData) {
            return res.status(404).json({ message: "Data not found" });
        }

        if (judul !== undefined) existingData.judul = judul;
        if (deskripsi !== undefined) existingData.deskripsi = deskripsi;
        if (alamat !== undefined) existingData.alamat = alamat;
        if (latitude !== undefined) existingData.latitude = latitude;
        if (longitude !== undefined) existingData.longitude = longitude;

        if (req.file) {
            existingData.foto = 'uploads/' + req.file.filename;
        }

        await existingData.save();

        const refreshed = await Pengaduan.findOne({
            where: {
                id_pengaduan: idPengaduan,
            },
        });

        res.json(toPengaduanResponse(refreshed));
    } catch (error) {
        console.log(error);
        res
            .status(error.statusCode || 500)
            .json(error.message || "Internal server error");
    }
};

// Fungsi untuk menghapus data pengaduan
const deletePengaduan = async (req, res) => {
    try {
        const { id } = req.params;

        const existingData = await Pengaduan.findOne({
            where: { id_pengaduan: id }
        });

        if (!existingData) {
            return res.status(404).json({ message: "Pengaduan tidak ditemukan" });
        }

        await existingData.destroy();
        
        res.json({ message: "Berhasil menghapus pengaduan" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    findAllPengaduan,
    insertPengaduan,
    updatePengaduan,
    deletePengaduan,
};
