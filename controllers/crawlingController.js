const axios = require('axios');
const cheerio = require('cheerio');
const newsurl = "https://sports.news.naver.com/index.nhn";
const news = "https://sports.news.naver.com"

async function getSportNews(){
    try{
        let ulList = [];
        let html = await axios.get(newsurl);
        const $ = cheerio.load(html.data);
        const $bodyList = $('div.today_section ul').children('li.today_item');
        $bodyList.each(function(i,elem){
            ulList[i] ={
                // imgUrl: $(this).find('img').attr('src'),
                title: $(this).find('strong.title').text(),
                url: news + $(this).find('a').attr('href'),
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