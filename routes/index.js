var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const verify = require('./jwtAuth').verifyToken;
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretkey').secretKey;
const crawling = require('../controllers/crawlingController');
/* GET home page. */



router.get('/', async function(req, res, next) {
  let crawlingNews = await crawling.getSportNews();
  console.log(crawlingNews);
  const token = req.cookies.accessToken;
  let Check;
  if(token){
    Check = jwt.verify(token,secretKey);
  }
  if(Check){
    res.render('index', { user:Check, news:crawlingNews });
  }else{
    res.render('index',{user:undefined, news:crawlingNews});
  }
  
});

router.get('/signTest',userController.signTest);
router.get('/verifyTest',userController.verifyTest);

module.exports = router;
