const Saran = require('../models/SaranModel');

// Fungsi untuk mengambil semua data saran
const findAllSaran = async (req, res) => {
    try {
        const datasaran = await Saran.findAll();
        res.json(datasaran);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Fungsi untuk memasukkan data saran baru
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
            .status(500)
            .json({ message: error.message || "Internal Server Error", error: error });
    }
};

// Fungsi untuk memperbarui data saran
const updateSaran = async (req, res) => {
    try {
        const idSaran = req.params.id;  // Ambil id_saran dari params
        const { judul, deskripsi, foto, latitude, longitude } = req.body;
        
        // Cari data yang ada berdasarkan id_saran
        const existingData = await Saran.findOne({
            where: {
                id_saran: idSaran,  // Gunakan idSaran yang benar
            },
        });

        // Jika data tidak ditemukan, return 404
        if (!existingData) {
            return res.status(404).json({ message: "Data not found" });
        }

        // Update fields
        existingData.judul = judul;
        existingData.deskripsi = deskripsi;
        existingData.foto = foto;
        existingData.latitude = latitude;
        existingData.longitude = longitude;

        // Simpan perubahan data
        await existingData.save();
        res.json(existingData);
    } catch (error) {
        console.log(error);
        res
            .status(error.statusCode || 500)
            .json(error.message || "Internal server error");
    }
};

// Fungsi untuk menghapus data saran
const deleteSaran = async (req, res) => {
    try {
        const { id } = req.params; // Mengambil id dari parameter URL (/saran/:id)

        // Cari data berdasarkan primary key (id_saran)
        const existingData = await Saran.findOne({
            where: { id_saran: id }
        });

        if (!existingData) {
            return res.status(404).json({ message: "Saran tidak ditemukan" });
        }

        // Hapus data
        await existingData.destroy();
        
        res.json({ message: "Berhasil menghapus saran" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    findAllSaran,
    insertSaran,
    updateSaran,
    deleteSaran,
};
