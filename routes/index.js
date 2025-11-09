var express = require('express');
const { login, register } = require('../controllers/Auth.controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', login);
router.post('/register', register)
module.exports = router;
