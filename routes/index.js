var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var multer = require('multer');

const { login, register } = require('../controllers/Auth.controller');
const {
  findAllSaran,
  insertSaran,
  updateSaran,
  deleteSaran,
} = require('../controllers/Saran.controller');
const {
  findAllPengaduan,
  insertPengaduan,
  updatePengaduan,
  deletePengaduan,
} = require('../controllers/Pengaduan.controller');

const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi storage untuk multer (sesuaikan dengan kebutuhanmu)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // folder tujuan simpan file
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // nama file: timestamp-namaasli.ext
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

// Filter tipe file (opsional, misalnya hanya gambar)
const fileFilter = (req, file, cb) => {
  // Contoh: hanya izinkan jpg, png
  const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipe file tidak diizinkan'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limits: { fileSize: 2 * 1024 * 1024 }, // contoh limit 2MB
});

const uploadFoto = (req, res, next) => {
  upload.single('foto')(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: err.message || 'Invalid upload' });
    }
    next();
  });
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Auth
router.post('/login', login);
router.post('/register', register);

// Saran
router.get('/saran', findAllSaran);
router.post('/saran', uploadFoto, insertSaran);
router.post('/saran/:id', uploadFoto, updateSaran);
router.delete('/saran/:id', deleteSaran);

// Pengaduan
router.get('/pengaduan', findAllPengaduan);
router.post('/pengaduan', uploadFoto, insertPengaduan);
router.post('/pengaduan/:id', uploadFoto, updatePengaduan);
router.delete('/pengaduan/:id', deletePengaduan);

module.exports = router;
