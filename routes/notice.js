var express = require('express');
var router = express.Router();
const noticeController = require('../controllers/noticeController');
const verify = require('./jwtAuth').verifyToken;
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretkey').secretKey;

/* GET notices listing. */
router.get('/list',verify,noticeController.getNotices);

router.get('/insert',verify,function(req,res){
    const token = req.cookies.accessToken;
    let Check;
    if(token){
      Check = jwt.verify(token,secretKey);
    }
    if(Check){
      res.render('notice/noticeInsert', { user:Check});
    }else{
      res.render('notice/noticeInsert',{user:1});
    }
    
});
router.post('/insert',verify,noticeController.insertNotice);
// 정보, 업데이트, 삭제
router.get('/:id',verify,noticeController.getNotice);
router.patch('/:id', verify,noticeController.updateNotice);
router.delete('/:id', verify,noticeController.deleteNotice);

module.exports = router;
