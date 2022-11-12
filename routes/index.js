var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const verify = require('./jwtAuth').verifyToken;
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretkey').secretKey;
/* GET home page. */
router.get('/', function(req, res, next) {
  const token = req.cookies.accessToken;
  let Check;
  if(token){
    Check = jwt.verify(token,secretKey);
  }
  
  console.log(Check);
  if(Check){
    res.render('index', { user:Check });
  }else{
    res.render('index',{user:undefined});
  }
  
});

router.get('/signTest',userController.signTest);
router.get('/verifyTest',userController.verifyTest);

module.exports = router;
