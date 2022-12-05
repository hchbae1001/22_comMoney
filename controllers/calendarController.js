const calendarService = require('../services/calendarService');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretkey').secretKey;

async function getCalendar(req,res){
    let user = await getUserInfo(req);
    const {id} = req.params;
    try{
        let data = await calendarService.getCalendar(id);
        return res.render('Calendar/CalendarDetail', {
            data:data,user:user
        });
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function getCalendars(req,res){
    const user = await getUserInfo(req);
    try{
        let data = await calendarService.getCalendars();
        return res.render('calendar/calendarList',{
            // data:data.rows, count:data.count,user:user 
        });
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function insertCalendar(req,res){
    const user = await getUserInfo(req);
    const {subject, text} = req.body;
    try{
        console.log(subject,text,user.id);
        await calendarService.insertCalendar(subject,text,user.id)
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function updateCalendar(req,res){
    const {id} = req.params;
    const user = await getUserInfo(req);
    const {title, text} = req.body;
    try{
        if((id == user.id) || (user.position == "사장" || user.position == "인사")){
            await calendarService.updateCalendar(title,text,id);
        }else{
            console.log("inValid User");
        }
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function deleteCalendar(req,res){
    const {id} = req.params;
    const {user_id} = req.body;
    const user = await getUserInfo(req);
    try{
        if((user_id == user.id) || (user.position == "사장" || user.position == "인사")){
            await calendarService.deleteCalendar(id);
        }else{
            console.log("inValid User");
        }
        return res.redirect('/');        
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function getUserInfo(req){
    const token = req.cookies.accessToken;
    let data = await jwt.verify(token,secretKey);
    console.log(data);
    return data;
}




module.exports={
    getCalendar:getCalendar,
    getCalendars:getCalendars,
    insertCalendar:insertCalendar,
    updateCalendar:updateCalendar,
    deleteCalendar:deleteCalendar
}