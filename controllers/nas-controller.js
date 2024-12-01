'use strict';
 
const Database = require('../database/database_mysql');
const util = require('../util/util');
const param = require('../util/param');
const logger = require('../util/logger');
const fs = require('fs');

/**
 * @Controller(path="/nas")
 */
class NasController {

    constructor() {
		this.database = new Database('database_mysql');
    }

	getList(req, res) {
		logger.debug('NasController:get 요청됨.')

		const folderPath = __dirname + '/../public/uploads';

		let files = [];
		try {
			const fileList = fs.readdirSync(folderPath);
			logger.debug('파일 리스트:', fileList);
			files = fileList.map((file) => {
				const filePath = `${folderPath}/${file}`;
				const stats = fs.statSync(filePath);
				return {
					name: file,
					size: stats.size
				};
			});
			logger.debug('파일 리스트:', files);
		} catch (err) {
			util.sendError(res, 400, '폴더 읽기 실패 : ' + err);
			return;
		}

		const output = {
			body: files
		}

		util.sendRes(res, 200, 'OK', output);
	}

	upload(req, res) {
		logger.debug('NasController:upload 요청됨.')

		logger.debug('FILES');
		logger.debug(JSON.stringify(req.files));

		if (req.files.length > 0) {
			var oldFile = __dirname + '/../uploads/' + req.files[0].filename;
			var newFile = __dirname + '/../public/uploads/' + req.files[0].filename;

			fs.rename(oldFile, newFile, (err) => {
				if (err) {
					logger.error('Error in moving file : ' + err);
					util.sendError(res, 400, 'Error in moving file : ' + err);
					return;
				}

				logger.debug('File copied to ' + newFile);

				// include uploaded file path
				const output = {
					filename:'/uploads/' + req.files[0].filename
				}

				util.sendRes(res, 200, 'OK', output);
			})
		}
	}
  
}

module.exports = NasController;