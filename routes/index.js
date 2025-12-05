var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');

const { login, register } = require('../controllers/Auth.controller');
const {
  findAllSaran,
  insertSaran,
  deleteSaran,
} = require('../controllers/Saran.controller');

// Konfigurasi storage untuk multer (sesuaikan dengan kebutuhanmu)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // folder tujuan simpan file
    cb(null, path.join(__dirname, '../public/uploads'));
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

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Auth
router.post('/login', login);
router.post('/register', register);

// Saran
router.get('/saran', findAllSaran);
router.post('/saran', upload.single('foto'), insertSaran);
router.delete('/saran/:id', deleteSaran);

module.exports = router;
