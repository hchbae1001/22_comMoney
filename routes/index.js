var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const verify = require('./jwtAuth').verifyToken;
/* GET home page. */
router.get('/',verify, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signTest',userController.signTest);
router.get('/verifyTest',userController.verifyTest);

module.exports = router;
