const noticeService = require('../services/noticeService');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretkey').secretKey;

async function getNotice(req,res){
    const {id} = req.params;
    try{
        let data = await noticeService.getNotice(id);
        return res.render();
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function getNotices(req,res){

    try{
        let data = await noticeService.getNotices();
        return res.render();
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function insertNotice(req,res){
    const user = getUserInfo(req);
    const {title, text} = req.body;

    try{
        await noticeService.insertNotice(title,text,user.id)
        return res.redirect('/notice');
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function updateNotice(req,res){
    const {id} = req.params;
    const user = getUserInfo(req);
    const {title, text} = req.body;
    try{
        if((id == user.id) || (user.position == "사장" || user.position == "인사")){
            await noticeService.updateNotice(title,text,id);
        }else{
            console.log("inValid User");
        }
        return res.redirect('/notice');
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function deleteNotice(req,res){
    const {id} = req.params;
    const user = getUserInfo(req);
    try{
        if((id == user.id) || (user.position == "사장" || user.position == "인사")){
            await noticeService.deleteNotice(id);
        }else{
            console.log("inValid User");
        }
        return res.redirect('/notice');        
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function getUserInfo(req){
    const token = req.cookies.accessToken;
    let data = await jwt.verify(token,secretKey);
    return data;
}




module.exports={
    getNotice:getNotice,
    getNotices:getNotices,
    insertNotice:insertNotice,
    updateNotice:updateNotice,
    deleteNotice:deleteNotice
}