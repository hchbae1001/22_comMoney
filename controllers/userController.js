const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = require('../config/secretkey').secretKey;

function positionCheck(position_id){
    let val = "";
    switch(position_id){
        case 0:
            val = "사원";
            break;
        case 1:
            val = "대리";
            break;
        case 2:
            val = "과장";
            break;
        case 3:
            val = "부장";
            break;
        case 4:
            val = "인사";
            break;
        case 5:
            val = "사장";
            break;       
    }
    return val;
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
            expiresIn: '10m',
            algorithm: 'HS256',
        }
    )
    res.cookie('accessToken', testToken);
    res.send(testToken);    
}

async function verifyTest(req,res){
    let token = req.cookies.accessToken;
    let data = jwt.verify(token,secretKey);
    res.send(data)
}

async function signIn(req,res){
    const {email,password} = req.body
    try{
        let user = await userService.logInUser(email);
        const compare = bcrypt.compareSync(password,user.password);
        if(compare){
            let position = positionCheck(user.position_id);
            const jwtToken = jwt.sign(
                {
                    userId:user.id,
                    email:user.email,
                    name:user.name,
                    position:position
                },secretKey,
                {
                    expiresIn: '30m',
                    algorithm: 'HS256',
                }
            )
            console.log('access');
            res.cookie('accessToken',jwtToken);
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
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function getUser(req,res){
    const id = req.params;
    try{
        let data = await userService.getUser(id);
        return res.render('user/detail',{
            data:data
        });
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function getUsers(req,res){
    const user = getUserInfo(req,res);
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
    const {email, password, name, position_id, dept_id, memo} = req.body;
    try{
        const encryptedPW = bcrypt.hashSync(password, 10);
        await userService.insertUser(email, encryptedPW, name, position_id, dept_id, memo);
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function updateUser(req,res){
    const {email, password, name, position_id, dept_id, memo} = req.body;
    const {id} = req.params;
    const user = getUserInfo(req,res);
    try{
        const encryptedPW = bcrypt.hashSync(password, 10);
        if(user.id == id){
            await userService.updateUser(email, encryptedPW, name, position_id, dept_id, memo);
            return res.redirect('/');
        }else if(user.position == "인사" || user.position == "사장"){
            await userService.updateUser(email, encryptedPW, name, position_id, dept_id, memo);
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
    const user = getUserInfo(req,res);
    try{
        if(user.position == "인사" || user.position == "사장");
        await userService.deleteUser(id);
        return res.redirect('/');
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function getUserInfo(req,res){
    const token = req.cookies.accessToken;
    let data = await jwt.verify(token,secretKey);
    return data;
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