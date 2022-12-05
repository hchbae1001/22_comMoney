var express = require('express');
var router = express.Router();
const calendarController = require('../controllers/calendarController');
const verify = require('./jwtAuth').verifyToken;
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretkey').secretKey;

/* GET calendars listing. */
router.get('/list',calendarController.getCalendars);

// router.get('/insert',verify,function(req,res){
//     const token = req.cookies.accessToken;
//     let Check;
//     if(token){
//       Check = jwt.verify(token,secretKey);
//     }
//     if(Check){
//       res.render('calendar/calendarInsert', { user:Check});
//     }else{
//       res.render('calendar/calendarInsert',{user:undefined});
//     }
    
// });
// router.post('/insert',verify,calendarController.insertcalendar);
// // 정보, 업데이트, 삭제
// router.get('/:id',verify,calendarController.getcalendar);
// router.patch('/:id', verify,calendarController.updatecalendar);
// router.delete('/:id', verify,calendarController.deletecalendar);

module.exports = router;
