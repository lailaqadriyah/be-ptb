var express = require('express');
const { login, register } = require('../controllers/Auth.controller');
var router = express.Router();
const {
  findAllSaran,
  insertSaran,
  deleteSaran,
}= require('../controllers/Saran.controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', login);
router.post('/register', register)

router.get('/saran', findAllSaran);
router.post('/saran', upload.single('foto'), insertSaran);
router.delete('/saran/:id', deleteSaran);
module.exports = router;
