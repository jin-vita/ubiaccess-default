/**
 * 통계 일별
 * 
 * 매일 00시 00분에 실행됨
 *
 * @author Mike
 *
 **/

const moment = require('moment');
const schedule = require('node-schedule');
  
const logger = require('../util/logger');
 
const Database = require('../database/database_mysql');

// begin:update 241231
const axios = require('axios');

const config = require('../config/config');

const https = require('https');
https.globalAgent.options.rejectUnauthorized = false


class Task {
    constructor() {
        this.database = new Database('database_mysql')
    }

    async doRequest() {
        logger.info('doRequest called.')

        // 웹으로 알림 요청
        const url = '/fcm/alert';

        let webParams = {
            requestCode: 'R1001',
            url: url
        }

        let webResult;
        try {

            webResult = await sendWeb(webParams);
            logger.debug(`요청 결과 -> ${JSON.stringify(webResult)}`);

        } catch(err) {
            logger.error(`웹 요청 시 에러 -> ${err}`, null);

        }


        logger.info('doRequest done.');

    }
 
}



///
/// 웹을 통한 요청
///
async function sendWeb(params) {
    logger.debug(`sendWeb called.`);

    return new Promise(async (resolve, reject) => {
        let reqProtocol = "http";
        if (config.server.https) {
            reqProtocol = "https";
        }

        let requestUrl = `${reqProtocol}://localhost:${config.server.port}${params.url}`;

        // params에서 url 속성 제거
        delete params.url;

        let requestInfo = {
            method: 'post',
            url: requestUrl,
            data: params,
            responseType: 'json'
        };

        //logger.debug('request -> ' + JSON.stringify(requestInfo));


        // Axios를 이용해 푸시 전송 요청
        try {

            const response = await axios(requestInfo);

            logger.debug('Response data type -> ' + typeof(response.data));
            logger.debug(response.data);

            let responseData = response.data;
            if (typeof(responseData) == 'string') {
                responseData = JSON.parse(response.data);
            } else if (typeof(responseData) == 'object') {
                responseData = response.data;
            }

            resolve(responseData);

        } catch(error) {
            logger.debug('Error -> ' + error);
            reject(error);
        }

    })

}




// 실행될 함수 이름
const command = 'doRequest';
const task1 = new Task();

const doTask = () => {

    try {
        let curTime = moment().format('YYYY-MM-DD HH:mm:ss');

        // 명령 실행
        console.log('[' + curTime + '] command -> ' + command);
        task1[command]();
        
    } catch(err) {
        console.log('error in executing command : ' + err);
    }

}

 
// 프로그램 실행 함수
const launch = () => {

    // 매일 정각 00시 00분에 doTask 실행
    let job = schedule.scheduleJob('0 9 * * *', () => {
        doTask();
    });
    console.log('job scheduled for 매일 00시 00분.');
     
 
    
    // 테스트용 
    const time = '39';
    job = schedule.scheduleJob(`${time} * * * *`, () => {
        doTask();
    });
    console.log(`job scheduled for 테스트 : 지정 ${time}분.`);
 

}

// 프로그램 실행
launch();