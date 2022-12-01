const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretkey').secretKey;

async function signIn(req,res){
    const {email,password} = req.body;
    try{
        let user = await userService.logInUser(email);
        const compare = bcrypt.compareSync(password,user.password);
        if(compare){
            const jwtToken = jwt.sign(
                {
                    id:user.id,
                    email:user.email,
                    name:user.name,
                    position:user.position
                },secretKey,
                {
                    expiresIn: '30m', // 30m -> 24h
                    algorithm: 'HS256',
                }
            )
            // const refreshToken = jwt.sign(
            //         {
            //             id:user.id
            //         },secretKey,
            //         {
            //             expiresIn: '1d',   
            //         }
            //     )
            console.log('access');
            res.cookie('accessToken',jwtToken);
            // res.cookie('refreshToken', refreshToken);
            return res.redirect('/');
        }else{
            console.log('access denied');
            return res.redirect('/');
        }
    }catch(err){
        console.log(err);
        return res.redirect('/');
    }
}

async function signOut(req,res){    
    try{
        res.clearCookie('accessToken',null,{
            maxAge:0
        });
        res.clearCookie('refreshToken',null,{
            maxAge:0
        });
        res.redirect('/');
    }catch(err){
        console.log(err); 
        return res.status(400).json(err);
    }
}

async function getUser(req,res){
    const {id} = req.params;
    let user = await getUserInfo(req);
    try{
        let data = await userService.getUser(id);
        // return console.log(data.position);
        return res.render('user/userDetail', { user:user, data:data});
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function getUsers(req,res){
    let user = await getUserInfo(req);
    try{
        if(user.position == "인사" || user.position == "사장"){
            let data = await userService.getUsers();
            return res.render('user/list',{data:data});
        }else{
            return res.redirect('/');
        }
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function insertUser(req,res){
    const {email,name,nickName,password,phone} = req.body;
    try{
        const encryptedPW = bcrypt.hashSync(password, 10);
        let data = await userService.insertUser(email,name,nickName,encryptedPW,phone);
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function updateUser(req,res){
    const {email,nickName,password,phone,position,dept} = req.body;
    const {id} = req.params;
    let img ='';
    let trans = 0;
    let user = await getUserInfo(req);
    try{
        if(password){
            trans = 1;
        }
        const encryptedPW = bcrypt.hashSync(password, 10);
        if(user.id == id){
            await userService.updateUser(id,email,nickName,encryptedPW,phone,position,dept,img,trans);
            return res.redirect('/user/signOut');
        }else if(user.position == "인사" || user.position == "사장"){
            await userService.updateUser(id,email,nickName,encryptedPW,phone,position,dept,img,trans);
            return res.redirect('/user/list');
        }else{
            console.log("Invalid User");
            return res.redirect('/');
        }
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function deleteUser(req,res){
    const {id} = req.params;
    let user = await getUserInfo(req);
    try{
        if(user.id == id){
            await userService.deleteUser(id);
            return res.redirect('/user/signOut');
        }else if(user.position == "인사" || user.position == "사장"){
            await userService.deleteUser(id);
            return res.redirect('/user/list');
        }else{
            console.log("Invalid User");
            return res.redirect('/');
        }
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

async function signTest(req,res){
    res.clearCookie('accessToken',null,{
        maxAge:0
    });
    let testToken = jwt.sign(
        {
            id: 1,
            email: "test@naver.com",
            name: "comMoney",
            position: "사장"
        },secretKey,
        {
            expiresIn: '1h',
            algorithm: 'HS256',
        }
    )
    res.cookie('accessToken', testToken);
    return res.redirect('/');
}

async function verifyTest(req,res){
    let token = req.cookies.accessToken;
    let data = jwt.verify(token,secretKey);
    //string
    console.log(typeof(data.position));
    res.send(data.position)
}

module.exports={
    signTest:signTest,
    verifyTest:verifyTest,
    signIn:signIn,
    signOut:signOut,
    getUser:getUser,
    getUsers:getUsers,
    insertUser:insertUser,
    updateUser:updateUser,
    deleteUser:deleteUser
}