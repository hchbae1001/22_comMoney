const noticeService = require('../services/noticeService');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretkey').secretKey;

async function getNotice(req,res){
    let user = await getUserInfo(req);
    const {id} = req.params;
    try{
        let data = await noticeService.getNotice(id);
        return res.render('notice/noticeDetail', {
            data:data,user:user
        });
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function getNotices(req,res){
    const user = await getUserInfo(req);
    try{
        let data = await noticeService.getNotices();
        return res.render('notice/noticeList',{
            data:data.rows, count:data.count,user:user
        });
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function insertNotice(req,res){
    const user = await getUserInfo(req);
    const {subject, text} = req.body;
    try{
        await noticeService.insertNotice(subject,text,user.id,user.name,user.dept,user.position);
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function updateNotice(req,res){
    const {id} = req.params;
    const user = await getUserInfo(req);
    const {subject, text} = req.body;
    try{
        if((id == user.id) || (user.position == "사장" || user.position == "인사")){
            await noticeService.updateNotice(subject,text,id);
        }else{
            console.log("inValid User");
        }
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function deleteNotice(req,res){
    const {id} = req.params;
    const {user_id} = req.body;
    const user = await getUserInfo(req);
    try{
        if((user_id == user.id) || (user.position == "사장" || user.position == "인사")){
            await noticeService.deleteNotice(id);
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
    getNotice:getNotice,
    getNotices:getNotices,
    insertNotice:insertNotice,
    updateNotice:updateNotice,
    deleteNotice:deleteNotice
}