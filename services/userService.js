let models = require('../models');
async function getUsers(offset,limit){
    try{
        let data = await models.user.findAndCountAll();
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function logInUser(email){
    try{
        let data = await models.user.findOne({
            where:{email:email}
        });
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function getUser(id){
    try{
        let data = await models.user.findOne({
            where:{id:id}
        });
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function insertUser(email,name,nickName,password,phone){
    try{
        await models.user.create({
            email:email,
            name:name,
            nickName:nickName,
            password:password,
            phone:phone,
            position:"사원",
            dept:"개발",
        });
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}
async function updateUser(id,email,nickName,password,phone,position,dept,transAction){
    try{
        if(transAction == '관리자'){
            await models.user.update(
                {
                    email:email,
                    nickName:nickName,
                    password:password,
                    phone:phone,
                    position:position,
                    dept:dept,
                },{where:{id:id}
            });
        }else{
            await models.user.update(
                {
                    email:email,
                    nickName:nickName,
                    password:password,
                    phone:phone
                },{where:{id:id}
            });
        }
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function deleteUser(id){
    try{
        await models.user.destroy({
            where:{id:id}
        });
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

module.exports ={
    logInUser:logInUser,
    getUser:getUser,
    getUsers:getUsers,
    insertUser:insertUser,
    updateUser:updateUser,
    deleteUser:deleteUser,
}