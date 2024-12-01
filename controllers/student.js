const util = require('../util/util')
const param = require('../util/param')
const logger = require('../util/logger')

const Database = require('../database/database_mysql')
const studentSql = require('../database/sql/student_sql')

/**
 * @Controller(path="/student")
 */
class Student {

    constructor() {
        this.database = new Database('database_mysql')
    }

    /**
     * @RequestMapping(path="/list", method="get,post")
     */
    async studentList(req, res) {
        logger.debug('studentList 요청됨.')

        const params = param.parse(req)

        try {
            // 레코드 개수 조회
            let sql = param.getCountSql(studentSql.student_list, params)
            let queryParam = {
                sql: sql
            }
            let rows = await this.database.query(queryParam)
            const total = rows[0].total

            // SQL문 실행
            sql = param.getSql(studentSql.student_list, params)
            queryParam = {
                sql: sql
            }
            rows = await this.database.query(queryParam)

            // 응답 보내기
            const output = {
                header: {
                    requestCode: params.requestCode, 
                    page: params.page,
                    perPage: params.perPage,
                    total: total,
                    search: params.search,
                    searchValue: params.searchValue,
                    searchJoin: params.searchJoin,
                    searchLike: params.searchLike,
                    order: params.order,
                    orderDirection: params.orderDirection
                },
                body: rows
            }
            util.sendRes(res, 200, 'OK', output)

        } catch(err) {
            util.sendError(res, 400, `Error : ${err}`)
        }

    }

    /**
     * @RequestMapping(path="/insert", method="get,post")
     */
    async studentInsert(req, res) {
        logger.debug('studentInsert 요청됨.')

        const params = param.parse(req)

        try {
            
            const queryParam = {
                sqlName: 'student_insert',
                params: params,
                paramType: {}
            }
            const rows = await this.database.execute(queryParam)

            // 응답 보내기
            const output = {
                header: {
                    requestCode: params.requestCode, 
                },
                body: rows
            }
            util.sendRes(res, 200, 'OK', output)

        } catch(err) {
            util.sendError(res, 400, `Error : ${err}`)
        }

    }

    /**
     * @RequestMapping(path="/update", method="get,post")
     */
    async studentUpdate(req, res) {
        logger.debug('studentUpdate 요청됨.')

        const params = param.parse(req)

        try {

            const queryParam = {
                sqlName: 'student_update',
                params: params,
                paramType: {}
            }
            const rows = await this.database.execute(queryParam)

            // 응답 보내기
            const output = {
                header: {
                    requestCode: params.requestCode,
                },
                body: rows
            }
            util.sendRes(res, 200, 'OK', output)

        } catch(err) {
            util.sendError(res, 400, `Error : ${err}`)
        }

    }

    /**
     * @RequestMapping(path="/delete", method="get,post")
     */
    async studentDelete(req, res) {
        logger.debug('studentDelete 요청됨.')

        const params = param.parse(req)

        try {

            const queryParam = {
                sqlName: 'student_delete',
                params: params,
                paramType: {}
            }
            const rows = await this.database.execute(queryParam)

            // 응답 보내기
            const output = {
                header: {
                    requestCode: params.requestCode,
                },
                body: rows
            }
            util.sendRes(res, 200, 'OK', output)

        } catch(err) {
            util.sendError(res, 400, `Error : ${err}`)
        }

    }

}

module.exports = Student 