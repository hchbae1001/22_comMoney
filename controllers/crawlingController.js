const axios = require('axios');
const cheerio = require('cheerio');
const { data } = require('jquery');
const schedule = require('node-schedule');
const log = console.log;
const newsurl = "https://sports.news.naver.com/index.nhn";
const news = "https://sports.news.naver.com"

async function getSportNews(){
    try{
        // let ulList = [];
        // let html = await axios.get(newsurl);
        // const $ = cheerio.load(html.data);
        // const $bodyList = $('div.today_section ul').children('li.today_item');
        // $bodyList.each(function(i,elem){
        //     ulList[i] ={
        //         // imgUrl: $(this).find('img').attr('src'),
        //         title: $(this).find('strong.title').text(),
        //         url: news + $(this).find('a').attr('href'),
        //         summary: $(this).find('p.news').text()
        //     }
        // });
        // const data = ulList.filter(n => n.title);
        // return data;

        let data2 =
        [
            {
                title:'축구협회 \'27번째 태극전사\' 오현규도 6000만원 포상',
                url:'https://sports.news.naver.com/news?oid=003&aid=0011593026',
                summary:'사내용 요약16강 진출에 따른 추가 포상금 1억원은 제외[도하(카타르)=뉴시스] 조성우 기자 = 대한민국 축구대표팀 손흥민이 16일(현지시간) 오전 카타르...',
            },
            {
                title: '김민재 "솔직히 일본이 많이 부럽다"',
                url: 'https://sports.news.naver.com/news?oid=449&aid=0000239975',
                summary: '\n' +
                  '\t\t\t\t\t\t\t월드컵에서 세계적인 공격수를 막아냈던 대표팀 수비의 핵심 김민재(나폴리)가 소속팀 합류를 위해 이탈리아로 떠났습니다.월드컵에서 많은 걸 느꼈다는 김민재는 자..."\n' +
                  '\t\t\t\t\t\t'
            },
            {
                title: "'황제' 벤제마, 결승전 뛸 수 있다…레알도 허락",
                url: 'https://sports.news.naver.com/news?oid=411&aid=0000020471',
                summary: '\n' +
                  '\t\t\t\t\t\t\t[포포투=한유철]카림 벤제마가 월드컵 결승전에 모습을 드러낼 수 있을까.프랑스는 19일 오전 0시(한국시간) 카타르 루사일에 위치한 루사일 스타디움에서 열리..."\n' +
                  '\t\t\t\t\t\t'
            },
            {
                title: "'소니 이즈 백'…마스크 벗고 다시 뛰는 손흥민",
                url: 'https://sports.news.naver.com/news?oid=025&aid=0003246257',
                summary: '\n' +
                  '\t\t\t\t\t\t\t마스크를 벗고 뛰는 손흥민. 사진 토트넘 인스타그램 손흥민(30·토트넘)이 마스크를 벗고 다시 뛴다. 토트넘은 15일(한국시간) 구단 소셜미디어(SNS)에 ..."\n' +
                  '\t\t\t\t\t\t'
            }
        ]
        
        return data2;


    }catch(err){
        console.log(err);
    }
}

module.exports={
    getSportNews:getSportNews
}