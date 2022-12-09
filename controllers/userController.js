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
                    position:user.position,
                    dept:user.dept
                },secretKey,
                {
                    expiresIn: '1h', // 30m -> 24h
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
    let {searchText,page} = req.query;
    if(!searchText){
        searchText='';
    }
    if(page == undefined){page = 1;}
    let limit = 1;
    let offset = 0 + (page - 1) * limit;

    console.log(page);
    let user = await getUserInfo(req);
    try{
        if(user.position == "인사" || user.position == "사장"){
            let data = await userService.getUsers(searchText,offset,limit);
            res.render('user/userList',{user:user,data:data.rows, count:data.count, pageNum:page, limit:limit, searchText:searchText});
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
        if(!email || !name || !password || !nickName){
            return res.redirect('/');
        }else{
            const encryptedPW = bcrypt.hashSync(password, 10);
            let data = await userService.insertUser(email,name,nickName,encryptedPW,phone);
            return res.redirect('/');
        }
    }catch(err){
        console.log(err);
        return res.status(400).json(err);
    }
}

async function updateUser(req,res){
    const {email,nickName,password,phone,position,dept} = req.body;
    const {id} = req.params;
    let user = await getUserInfo(req);
    let transAction = '일반';
    try{
        const encryptedPW = bcrypt.hashSync(password, 10);
        if(user.id == id){
            if(user.position == "인사" || user.position == "사장"){
                transAction = '관리자';
            }
            await userService.updateUser(id,email,nickName,encryptedPW,phone,position,dept,transAction);
            return res.redirect('/user/signOut');
        }else if(user.position == "인사" || user.position == "사장"){
            transAction = '관리자';
            await userService.updateUser(id,email,nickName,encryptedPW,phone,position,dept,transAction);
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

async function getSalary(req,res){
    let user = await getUserInfo(req);
    console.log(user);

    let salary_month, salary_year,salary_char;
    let op1,op2,op3,op4,op5,op6;
    try{
        switch(user.position){
            case '사장':
                salary_month =  10000000;
                salary_char = '10,000,000'
                op5 = 1552400
                break;
            case '인사':
                salary_month =  3000000;
                salary_char = '3,000,000'
                op5 = 84850
                break;
            case '부장':
                salary_month =  6000000;
                salary_char = '6,000,000'
                op5 = 550900
                break;
            case '과장':
                salary_month =  5000000;
                salary_char = '5,000,000'
                op5 = 350470
                break;
            case '대리':
                salary_month =  4000000;
                salary_char = '4,000,000'
                op5 = 210960
                break;    
            case '사원':
                salary_month =  3000000;
                salary_char = '3,000,000'
                op5 = 84850
                break;
        }
        salary_year = salary_month * 12;
        if(salary_month > 5530000){
            op1 = 5530000 * 0.045
        }else{
            op1 = salary_month*0.045
        }
        op2 = salary_month * 0.03495
        op3 = op2 * 0.1227
        op4 = salary_month * 0.009
        op6 = op5 * 0.1
        let salary_option = {
            'op1':Math.floor(op1),
            'op2':Math.floor(op2),
            'op3':Math.floor(op3),
            'op4':Math.floor(op4),
            'op5':Math.floor(op5),
            'op6':Math.floor(op6)
        };
        console.log(salary_option);
        return res.render('user/userSalary', { user:user, salary_month:salary_month,salary_year:salary_year, salary_char:salary_char,salary_option:salary_option});
    }catch(err){
        console.log(err);
    }
}

async function signTest(req,res){
    res.clearCookie('accessToken',null,{
        maxAge:0
    });
    let testToken = jwt.sign(
        {
            id:1,
            email:'admin@test',
            name:'관리자',
            position:'사장',
            dept:'경영'
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
    deleteUser:deleteUser,
    getSalary:getSalary
}