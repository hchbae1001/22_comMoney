const axios = require('axios');
const cheerio = require('cheerio');
const log = console.log;
const url = "https://sports.news.naver.com/index.nhn";

async function getSportNews(){
    try{
        let ulList = [];
        let html = await axios.get(url);
        const $ = cheerio.load(html.data);
        const $bodyList = $('div.today_section ul').children('li.today_item');
        $bodyList.each(function(i,elem){
            ulList[i] ={
                title: $(this).find('strong.title a').text(),
                url: $(this).find('strong.title a').attr('href'),
                summary: $(this).find('p.news').text()
            }
        }); 
        const data = ulList.filter(n => n.title);
        return data;
    }catch(err){
        console.log(err);
    }
}

module.exports={
    getSportNews:getSportNews
}