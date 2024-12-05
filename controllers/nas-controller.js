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

	getFolderSize(folderPath) {
		let totalSize = 0;

		const fileList = fs.readdirSync(folderPath);
		fileList.forEach((file) => {
			const filePath = `${folderPath}/${file}`;
			const stats = fs.statSync(filePath);

			if (stats.isDirectory()) {
				// 재귀적으로 하위 폴더 크기 계산
				totalSize += this.getFolderSize(filePath);
			} else {
				// 파일 크기 추가
				totalSize += stats.size;
			}
		});

		return totalSize;
	}

	get(req, res) {
		logger.debug('NasController:get 요청됨.')

		const folderPath = __dirname + '/../public/uploads';

		let files = [];
		try {
			const fileList = fs.readdirSync(folderPath);
			logger.debug('파일 리스트:', fileList);
			files = fileList.map((file) => {
				const filePath = `${folderPath}/${file}`;
				const stats = fs.statSync(filePath);
				logger.debug('stats:', stats);
				let type = 'file';
				let size = stats.size;
				if (stats.isDirectory()) {
					type = 'folder';
					size = this.getFolderSize(filePath);
				}
				return {
					name: file,
					size: size,
					type: type,
					timestamp: stats.birthtimeMs,
				};
			});

			files.sort((a, b) => b.timestamp - a.timestamp);
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

	delete(req, res) {
		logger.debug('NasController:delete 요청됨.')
		const params = param.parse(req);

		const folderPath = __dirname + '/../public/uploads';
		const filePath = `${folderPath}/${params.file}`;

		try {
			// 파일 존재 여부 확인
			if (fs.existsSync(filePath)) {
				const stats = fs.statSync(filePath);
				if (stats.isFile()) {
					// 파일 삭제
					fs.unlinkSync(filePath);
				} else {
					// 폴더 삭제 (하위 파일 포함)
					fs.rmSync(filePath, { recursive: true, force: true });
					console.log('디렉토리와 하위 파일이 모두 삭제되었습니다.');
				}
				logger.debug(`파일 삭제 완료: ${params.file}`);

				// 응답 전송
				util.sendRes(res, 200, 'OK', { message: `파일이 삭제되었습니다. ${params.file}` });
			} else {
				// 파일이 없을 경우 에러 처리
				logger.error(`파일이 존재하지 않음: ${params.file}`);
				util.sendError(res, 404, `파일을 찾을 수 없습니다: ${params.file}`);
			}
		} catch (err) {
			logger.error(`파일 삭제 중 오류 발생: ${err}`);
			util.sendError(res, 500, `파일 삭제 중 오류 발생: ${err}`);
		}
	}

	upload(req, res) {
		logger.debug('NasController:upload 요청됨.')

		logger.debug('FILES');
		logger.debug(JSON.stringify(req.files));

		if (req.files.length > 0) {
			const oldFile = __dirname + '/../uploads/' + req.files[0].filename;
			const newFileDir = __dirname + '/../public/uploads/';
			const newFile = newFileDir + req.files[0].filename;

			// Ensure the uploads directory exists
			if (!fs.existsSync(newFileDir)) {
				try {
					// recursive: true 로 하위 폴더도 생성 가능
					fs.mkdirSync(newFileDir, { recursive: true });
					logger.debug('Uploads directory created at: ' + newFileDir);
				} catch (err) {
					logger.error('Error creating uploads directory: ' + err);
					util.sendError(res, 500, 'Error creating uploads directory: ' + err);
					return;
				}
			}

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