let models = require('../models');
async function getNotices(){
    try{
        let data = await models.notice.findAndCountAll({

        });
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function getNotice(id){
    try{
        let data = await models.notice.findOne({
            where:{id:id}
        });
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function insertNotice(subject,text,user_id){
    try{
        await models.notice.create({
            subject:subject,
            text:text,
            user_id:user_id,
            img:''
        });
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function updateNotice(title,text,id){
    try{
        let data = await models.notice.update({
            title:title,
            text:text
        },{where:{id:id}
    });
        console.log(data);
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function deleteNotice(id){
    try{
        await models.notice.destroy({
            where:{id:id}
        });
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

module.exports ={
    deleteNotice:deleteNotice,
    insertNotice:insertNotice,
    updateNotice:updateNotice,
    getNotice:getNotice,
    getNotices:getNotices 
}