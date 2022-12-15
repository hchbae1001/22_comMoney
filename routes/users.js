var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const verify = require('./jwtAuth').verifyToken;
/* GET users listing. */
router.get('/signOut', userController.signOut);
router.get('/list',verify, userController.getUsers);
router.post('/signIn',userController.signIn);
router.get('/salary',verify,userController.getSalary);
// 로그아웃
router.get('/logout',verify, userController.signOut);
//회원가입 폼 페이지 + 가입
router.get('/insert',function(req,res){
    res.render('user/userInsert', { title: 'Express' });
});
router.post('/insert',userController.insertUser);
router.post('/ajax',verify,userController.getuserAjax);
router.get('/userDummy',verify,userController.makedummies);
// 정보, 업데이트, 삭제
router.get('/:id',verify,userController.getUser);
router.patch('/:id', verify,userController.updateUser);
router.delete('/:id', verify,userController.deleteUser);

module.exports = router;
