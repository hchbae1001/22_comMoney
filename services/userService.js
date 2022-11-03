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

async function insertUser(email,password,name,position_id,dept_id,memo){
    try{
        await models.user.create({
            email:email,
            password:password,
            name:name,
            phone:phone,
            position_id:position_id,
            dept_id:dept_id,
            memo:memo
        });
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}
//email과 비밀번호만 바뀜
async function updateUser(id,email,password,position_id,dept_id,memo){
    console.log("contain pwd");
    try{
        await models.user.update({
            email:email,
            password:password,
            position_id:position_id,
            dept_id:dept_id,
            memo:memo
        },{where:{id:id}
    });
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