let models = require('../models');
async function getCalendars(){
    try{
        let data = await models.Calendar.findAndCountAll();
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function getCalendar(id){
    try{
        let data = await models.Calendar.findOne({
            where:{id:id}
        });
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function insertCalendar(subject,text,user_id){
    try{
        await models.Calendar.create({
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

async function updateCalendar(title,text,id){
    try{
        let data = await models.Calendar.update({
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

async function deleteCalendar(id){
    try{
        await models.Calendar.destroy({
            where:{id:id}
        });
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

module.exports ={
    deleteCalendar:deleteCalendar,
    insertCalendar:insertCalendar,
    updateCalendar:updateCalendar,
    getCalendar:getCalendar,
    getCalendars:getCalendars 
}