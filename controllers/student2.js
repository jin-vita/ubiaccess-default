/**
 * student 테이블의 내용을 SQL로 리스트 조회, 추가, 수정, 삭제하는 예제
 * 
 * - DB에 student 테이블이 만들어져 있어야 합니다.
 * - SQL 파일은 database/sql 폴더 안에 student.js 파일에 들어가 있습니다.
 * - Postman을 이용해 아래 URL로 테스트할 수 있습니다.
 * 
 *     (1) 리스트 조회 (전체)
 *        GET    http://localhost:8001/student2
 *     (2) 리스트 조회 (1페이지)
 *        GET    http://localhost:8001/student2     파라미터 : page=1&perPage=5
 *     (3) 검색 (조건 1개)
 *        GET    http://localhost:8001/student2     파라미터 : page=1&perPage=5&search=name&searchValue=홍길동1
 *     (4) 검색 (조건 여러 개)
 *        GET    http://localhost:8001/student2     파라미터 : page=1&perPage=5&search=name,mobile&searchValue=홍길동,010-1000&searchJoin=and&searchLike=true&order=name&orderDirection=ASC
 *     (5) 단건 조회 (id가 1인 것 조회)
 *        GET    http://localhost:8001/student2/1
 *     (6) 추가
 *        POST   http://localhost:8001/student2     파라미터 : name=홍길동11    age=31    mobile=010-9000-9000
 *     (7) 수정 (id가 11인 것 수정)
 *        PUT    http://localhost:8001/student2/11   파라미터 : name=홍길동21    age=41    mobile=010-9000-1234
 *     (8) 삭제 (id가 11인 것 삭제)
 *        DELETE http://localhost:8001/student2/1
 * 
 */

'use strict'

const util = require('../util/util')
const param = require('../util/param')
const logger = require('../util/logger')

const Database = require('../database/database_mysql')
const studentSql = require('../database/sql/student_sql')

/**
 * @Controller(path="/student2")
 */
class Student2 {

  ///
  /// 초기화
  ///
  constructor() {
    this.database = new Database('database_mysql')
  }


  ///
  /// 리스트 조회
  ///

  /**
   * @RequestMapping(path="/", method="get")
   */
  async list(req, res) {
    logger.debug('Student:list called for GET /student2')

    const params = param.parse(req)
    
    try {

      // 리스트 개수 SQL 실행
      let sql = param.getCountSql(studentSql.student_list, params)
        
      let queryParams = {
        sql: sql,
        sqlParams: []
      }

      let rows = await this.database.query(queryParams)
      const total = rows[0].total

      // 리스트 조회 SQL 실행
      sql = param.getSql(studentSql.student_list, params)
      
      queryParams = {
        sql: sql,
        sqlParams: []
      }

      rows = await this.database.query(queryParams)

      // 결과 응답 전송
      const output = {
        header: {
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
        data: rows
      }
      
      util.sendRes(res, 200, 'OK', output)

    } catch(err) {
      util.sendError(res, 400, 'Error in execute -> ' + err)
    }
  }


  ///
  /// 단건 조회
  ///

  /**
   * @RequestMapping(path="/:id", method="get")
   */
  async read(req, res) {
    logger.debug('Student:read called for GET /student2/:id')

    const params = param.parse(req)
      
    try {
            
      // 단건 조회 SQL 실행
      const queryParams = {
        sqlName: 'student_read',
        params: params,
        paramType: {
          id: 'integer'
        }
      }

      const rows = await this.database.execute(queryParams)

      // 조회한 개수
      let total = rows.length
 
      // 결과 응답 전송
      const output = {
        header: {
          total: total
        },
        data: [
          rows
        ]
      }
      
      util.sendRes(res, 200, 'OK', output)

    } catch(err) {
      util.sendError(res, 400, 'Error in execute -> ' + err)
    }
  }


  ///
  /// 추가
  ///

  /**
   * @RequestMapping(path="/", method="post")
   */
  async create(req, res) {
    logger.debug('Student:create called for POST /student2')

    const params = param.parse(req)
      
    try {
              
      // 추가 SQL 실행
      const queryParams = {
        sqlName: 'student_create',
        params: params,
        paramType: {}
      }

      const rows = await this.database.execute(queryParams)

      // 생성된 개수
      let total = 0
      if (rows && rows.affectedRows) {
        total = rows.affectedRows
      }

      // 결과 응답 전송
      const output = {
        header: {
          total: total
        },
        data: []
      }
      
      util.sendRes(res, 200, 'OK', output)
    } catch(err) {
      util.sendError(res, 400, 'Error in execute -> ' + err)
    }
  }


  ///
  /// 수정
  ///

  /**
   * @RequestMapping(path="/:id", method="put")
   */
  async update(req, res) {
    logger.debug('Student:update called for PUT /student2/:id')

    const params = param.parse(req);
      
    try {
          
      // 수정 SQL 실행
      const queryParams = {
        sqlName: 'student_update',
        params: params,
        paramType: {
          id: 'integer'
        }
      }

      const rows = await this.database.execute(queryParams)

      // 수정된 개수
      let total = 0
      if (rows && rows.affectedRows) {
        total = rows.affectedRows
      }

      // 결과 응답 전송
      const output = {
        header: {
          total: total
        },
        data: []
      }
      
      util.sendRes(res, 200, 'OK', output)

    } catch(err) {
      util.sendError(res, 400, 'Error in execute -> ' + err)
    }
  }


  ///
  /// 삭제
  ///

  /**
   * @RequestMapping(path="/:id", method="delete")
   */
  async delete(req, res) {
    logger.debug('Student:delete called for DELETE /student2/:id')

    const params = param.parse(req)
      
    try {
          
      // 삭제 SQL 실행
      const queryParams = {
        sqlName: 'student_delete',
        params: params,
        paramType: {
          id: 'integer'
        }
      }

      const rows = await this.database.execute(queryParams)

      // 삭제된 개수
      let total = 0
      if (rows && rows.affectedRows) {
        total = rows.affectedRows
      }

      // 결과 응답 전송
      const output = {
        header: {
          total: total
        },
        data: []
      }
      
      util.sendRes(res, 200, 'OK', output)

    } catch(err) {
      util.sendError(res, 400, 'Error in execute -> ' + err)
    }
  }


  /**
   * @RequestMapping(path="/upload", method="post", upload="true")
   */
  async upload(req, res) {
    logger.debug('Student:upload called for path /student2/upload');

    const params = param.parse(req);

    // 업로드 대상 파일명 확인
    const filename = params.filename;
    logger.debug('FILES -> ' + JSON.stringify(req.files));
    
    // 업로드된 파일 정보가 없는 경우
    if (typeof(req.files) == 'undefined') {
      logger.error('No file uploaded.');
      util.sendError(res, 400, 'No file uploaded.');
      return;
    }

    // 업로드 파일 처리 (지정한 폴더로 이동하고 파일 이름 반환받음)
    const oldFolder = '/../uploads/'        // 1차 업로드된 폴더
    const newFolder = '/../public/images/'  // 파일을 옮겨둘 폴더
    const pathFolder = '/images/'           // 외부에서 접근할 패스 폴더
    
    try {
      const outFilename = await util.handleUploadFile(req.files, oldFolder, newFolder, pathFolder)
      
      const output = {
        filename:outFilename
      }

      util.sendRes(res, 200, 'OK', output);

    } catch(err) {
      logger.error('Error in handling uploaded file : ' + err);
      util.sendError(res, 400, 'Error in handling uploaded file : ' + err);
    }

  }

}


module.exports = Student2;
