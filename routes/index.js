var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const verify = require('./jwtAuth').verifyToken;
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretkey').secretKey;
const crawling = require('../controllers/crawlingController');
const noticeService = require('../services/noticeService');
/* GET home page. */



router.get('/', async function(req, res, next) {
  // return res.render('test');
  let data = await noticeService.getNotices();
  // return res.send(data);
  let crawlingNews = await crawling.getSportNews();
  const token = req.cookies.accessToken;
  let Check;
  if(token){
    Check = jwt.verify(token,secretKey);
  }
  if(Check){
    res.render('test', { user:Check, news:crawlingNews,data:data.rows });
    // res.render('index', { user:Check, news:crawlingNews,data:data.rows });
  }else{
    res.render('test',{user:1, news:crawlingNews, data:data.rows});
    // res.render('index',{user:undefined, news:crawlingNews, data:data.rows});
  }
});

router.get('/signTest',userController.signTest);
router.get('/verifyTest',userController.verifyTest);

module.exports = router;
