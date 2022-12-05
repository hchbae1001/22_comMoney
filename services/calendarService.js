let models = require('../models');
async function getCalendars(){
    try{
        let data = await models.calendar.findAndCountAll();
        console.log(data);
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function getCalendar(id){
    try{
        let data = await models.calendar.findOne({
            where:{id:id}
        });
        return data;
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function insertCalendar(user_id,user_name,date,subject,text){
    try{
        await models.calendar.create({
            user_id:user_id,
            user_name:user_name,
            date:date,
            subject:subject,
            text:text,
        });
    }catch(err){
        console.log(err);
        throw Error(err);
    }
}

async function updateCalendar(title,text,id){
    try{
        let data = await models.calendar.update({
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
        await models.calendar.destroy({
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