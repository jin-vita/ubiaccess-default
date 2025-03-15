const util = require(`../util/util`);
const param = require(`../util/param`);
const logger = require(`../util/logger`);

const fcm = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
fcm.initializeApp({
    credential: fcm.credential.cert(serviceAccount)
});
const db = fcm.firestore();
const { Timestamp } = require('firebase-admin/firestore');

/**
 * @Controller(path="/fcm")
 */
class FcmController {

    constructor() {
        // 고유 id 생성을 위한 변수
        this.seqCode = 0;
    }

    /**
     * Generate request code (using time and sequence)
     */
    generateRequestCode() {
        let date = new Date();

        let seqCodeStr = this.getSeqCode();

        let components = [
            date.getFullYear(),
            ("0" + (date.getMonth() + 1)).slice(-2),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds(),
            seqCodeStr,
        ];

        return components.join("");
    }


    /**
     * Get sequence code (01 ~ 99)
     */
    getSeqCode() {
        this.seqCode += 1;
        if (this.seqCode > 99) {
            this.seqCode = 0;
        }

        let seqCodeStr = String(this.seqCode);
        if (seqCodeStr.length === 1) {
            seqCodeStr = "0" + seqCodeStr;
        }

        return seqCodeStr;
    }

    /**
     * FCM 테스트
     */

    /**
     * @RequestMapping(path="/test")
     */
    async fcmTest(req, res) {
        logger.debug(`fcmTest 요청됨.`);

        const params = param.parse(req);

        const data = [];

        const now = new Date();
        now.setUTCHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정
        const todayTimestamp = Timestamp.fromDate(now);
        const fiveDaysLater = new Timestamp(todayTimestamp.seconds + 5 * 24 * 60 * 60, 0); // 현재 시간 + 5일 (초 단위)

        const snapshot = await db.collection(`expita/${params.room}/product`)
            .where('expiryDate', '<=', fiveDaysLater)
            .get();

        if (snapshot.empty) {
            console.log('⚠️ 5일 이하로 남은 문서가 없습니다.');
            util.sendError(res, 400, `No data found.`);
            return;
        }

        snapshot.forEach(doc => {
            console.log(`📌 Document ID: ${doc.id}`, doc.data());
            data.push(doc.data().name);
        });

        params.data = data.toString();

        try {
            logger.debug(`params: ${JSON.stringify(params)}`);

            if (typeof (params.token) == 'undefined' || params.token === "") {
                logger.error(`Parameter token is undefined.`);
                util.sendError(res, 400, `Parameter token is undefined.`);
                return
            }

            if (typeof (params.receiver) == 'undefined') {
                logger.error(`Parameter receiver is undefined.`);
                util.sendError(res, 400, `Parameter reciever is undefined.`);
                return
            }

            if (typeof (params.data) == "undefined") {
                logger.error(`Parameter data is undefined.`);
                util.sendError(res, 400, `Parameter data is undefined.`);
                return
            }

            if (typeof (params.sender) == "undefined") {
                params.sender = "fcm test server"
            }

            const regIds = [];
            if (params.token.length > 1) {
                regIds.push(params.token);
            }

            const data = {
                requestCode: this.generateRequestCode(),
                id: this.generateRequestCode(),
                sender: params.sender,
                receiver: params.receiver,
                receiverType: "web",
                dataType: "text",
                title: "소비기한임박",
                body: params.data
            }

            logger.debug(`regIds : ${regIds}`)

            const message = {
                data: data,
                tokens: regIds,
            };


            // 메세지 전송
            if (regIds.length !== 0) {
                fcm.messaging().sendEachForMulticast(message)
                    .then((response) => {
                        logger.debug(`Push send success! count : ${response.successCount}`)
                    }).catch(function (err) {
                    logger.debug(`Push send error : ${err}`)
                });
            }

            util.sendRes(res, 200, "OK", data);
            logger.debug(`FcmTest -> ${JSON.stringify(data)}`);
        } catch (err) {
            util.sendError(res, 400, `Error : ${err}`);
            logger.error(`Error in FcmController:FcmTest -> ${err}`);
        }
    }

    /**
     * FCM ALERT TEST
     */

    /**
     * @RequestMapping(path="/alert-test")
     */
    async fcmAlertTest(req, res) {
        logger.debug(`fcmAlertTest 요청됨.`);
        const params = param.parse(req);

        const snapshotUser = await db.collection(`users`)
            .where('nickname', '==', params.nickname)
            .get();

        let user;
        snapshotUser.forEach(doc => {
            console.log(`📌 Document ID: ${doc.id}`, doc.data());
            if (doc.data().token) {
                user = doc.data();
            }
        });

        const now = new Date();
        now.setUTCHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정
        const todayTimestamp = Timestamp.fromDate(now);
        const fiveDaysLater = new Timestamp(todayTimestamp.seconds + 5 * 24 * 60 * 60, 0); // 현재 시간 + 5일 (초 단위)

        try {
            const names = [];

            const snapshot = await db.collection(`expita/${user.room}/product`)
                .where('expiryDate', '<=', fiveDaysLater)
                .get();

            if (snapshot.empty) {
                console.log('⚠️ 5일 이하로 남은 문서가 없습니다.');
                util.sendRes(res, 200, "OK", { successCount: 0 });
                return
            }

            snapshot.forEach(doc => {
                console.log(`📌 Document ID: ${doc.id}`, doc.data());
                names.push(doc.data().name);
            });

            logger.debug(`user: ${JSON.stringify(user)}`);

            const regIds = [];
            if (user.token.length > 1) {
                regIds.push(user.token);
            }

            const data = {
                requestCode: this.generateRequestCode(),
                id: this.generateRequestCode(),
                sender: 'EXPITA SERVER',
                receiver: user.nickname,
                receiverType: "web",
                dataType: "text",
                title: "소비기한임박",
                body: names.toString()
            }

            const message = {
                data: data,
                tokens: regIds,
            };

            // 메세지 전송
            if (regIds.length !== 0) {
                fcm.messaging().sendEachForMulticast(message)
                    .then((response) => {
                        logger.debug(`Push send success! count : ${response.successCount}`)
                    }).catch(function (err) {
                    logger.debug(`Push send error : ${err}`)
                });
            }

            logger.debug(`FcmTest -> ${JSON.stringify(data)}`);

        } catch (err) {
            util.sendError(res, 400, `Error : ${err}`);
            logger.error(`Error in FcmController:fcmAlert -> ${err}`);
        }
        util.sendRes(res, 200, "OK", { successCount: 1 });
    }

    /**
     * FCM ALERT
     */

    /**
     * @RequestMapping(path="/alert")
     */
    async fcmAlert(req, res) {
        logger.debug(`fcmAlert 요청됨.`);

        const snapshotUser = await db.collection(`users`)
            .get();

        const users = [];
        snapshotUser.forEach(doc => {
            console.log(`📌 Document ID: ${doc.id}`, doc.data());
            if (doc.data().token) {
                users.push(doc.data());
            }
        });

        const now = new Date();
        now.setUTCHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정
        const todayTimestamp = Timestamp.fromDate(now);
        const fiveDaysLater = new Timestamp(todayTimestamp.seconds + 5 * 24 * 60 * 60, 0); // 현재 시간 + 5일 (초 단위)

        try {
            for (const user of users) {
                const names = [];

                const snapshot = await db.collection(`expita/${user.room}/product`)
                    .where('expiryDate', '<=', fiveDaysLater)
                    .get();

                if (snapshot.empty) {
                    console.log('⚠️ 5일 이하로 남은 문서가 없습니다.');
                    continue;
                }

                snapshot.forEach(doc => {
                    console.log(`📌 Document ID: ${doc.id}`, doc.data());
                    names.push(doc.data().name);
                });

                logger.debug(`user: ${JSON.stringify(user)}`);

                const regIds = [];
                if (user.token.length > 1) {
                    regIds.push(user.token);
                }

                const data = {
                    requestCode: this.generateRequestCode(),
                    id: this.generateRequestCode(),
                    sender: 'EXPITA SERVER',
                    receiver: user.nickname,
                    receiverType: "web",
                    dataType: "text",
                    title: "소비기한임박",
                    body: names.toString()
                }

                const message = {
                    data: data,
                    tokens: regIds,
                };

                // 메세지 전송
                if (regIds.length !== 0) {
                    fcm.messaging().sendEachForMulticast(message)
                        .then((response) => {
                            logger.debug(`Push send success! count : ${response.successCount}`)
                        }).catch(function (err) {
                        logger.debug(`Push send error : ${err}`)
                    });
                }

                logger.debug(`FcmTest -> ${JSON.stringify(data)}`);
            }

        } catch (err) {
            util.sendError(res, 400, `Error : ${err}`);
            logger.error(`Error in FcmController:fcmAlert -> ${err}`);
        }
        util.sendRes(res, 200, "OK", { successCount: users.length });
    }
}

module.exports = FcmController;