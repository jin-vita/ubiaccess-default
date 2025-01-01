'use strict';

const util = require('../util/util');
const param = require('../util/param');
const logger = require('../util/logger');
const fs = require('fs');

/**
 * @Controller(path="/nas")
 */
class NasController {
	get = (req, res) => {
		const params = param.parse(req);
		let directory = 'root';

		if (params.directory) {
			directory = params.directory
		}

		const folderPath = __dirname + `/../public/${directory}`;
		let files = [];
		const output = {
			body: files
		}

		// Ensure the [directory] directory exists
		if (!fs.existsSync(folderPath)) {
			try {
				// recursive: true 로 하위 폴더도 생성 가능
				fs.mkdirSync(folderPath, { recursive: true });
				logger.debug(`${directory} directory created at: ${folderPath}`);
			} catch (err) {
				logger.error(`Error creating ${directory} directory: ${err}`);
				util.sendError(res, 500, `Error creating ${directory} directory: ${err}`);
				return;
			}
		}

		try {
			const fileList = fs.readdirSync(folderPath);

			if (!fileList.length) {
				logger.debug('No files found');
				util.sendRes(res, 200, 'OK', output);
				return;
			}

			files = fileList.map((file) => {
				const filePath = `${folderPath}/${file}`;
				const stats = fs.statSync(filePath);
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
			logger.debug('files length:', files.length);
			files.sort((a, b) => {
				// 1. 타입 우선 정렬 (folder가 앞에 오도록)
				if (a.type === 'folder' && b.type === 'file') return -1;
				if (a.type === 'file' && b.type === 'folder') return 1;

				// 2. 타입이 같으면 timestamp로 정렬 (내림차순)
				return b.timestamp - a.timestamp;
			});
		} catch (err) {
			util.sendError(res, 400, `Failed to read folder: ${err}`);
			return;
		}

		output.body = files

		util.sendRes(res, 200, 'OK', output);
	}

	getFolderSize = (folderPath) => {
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

	delete(req, res) {
		const params = param.parse(req);
		let directory = 'root';

		if (params.directory) {
			directory = params.directory
		}

		const folderPath = __dirname + `/../public/${directory}`;
		const filePath = `${folderPath}/${params.file}`;

		try {
			// 파일 존재 여부 확인
			if (fs.existsSync(filePath)) {
				const stats = fs.statSync(filePath);

				if (stats.isFile()) {
					// 파일 삭제
					fs.unlinkSync(filePath);

					const message = `File has been deleted: ${params.file}`;
					logger.debug(message);
					util.sendRes(res, 200, 'OK', { message: message });
					return;
				}

				// 폴더 삭제 (하위 파일 포함)
				fs.rmSync(filePath, { recursive: true, force: true });
				logger.debug('The directory and all its sub-files were deleted');

				const message = `Folder has been deleted: ${params.file}/`;
				logger.debug(message);
				util.sendRes(res, 200, 'OK', { message: message });
			} else {
				const message = `File not found: ${params.file}`;
				logger.error(message);
				util.sendError(res, 404, message);
			}
		} catch (err) {
			const message = `An error occurred while deleting the file: ${err}`;
			logger.error(message);
			util.sendError(res, 500, message);
		}
	}

	upload(req, res) {
		const params = param.parse(req);
		let directory = 'root';

		if (params.directory) {
			directory = params.directory
		}

		const newFileDir = __dirname + `/../public/${directory}/`;

		// Ensure the [directory] directory exists
		if (!fs.existsSync(newFileDir)) {
			try {
				// recursive: true 로 하위 폴더도 생성 가능
				fs.mkdirSync(newFileDir, { recursive: true });
				logger.debug(`${directory} directory created at: ${newFileDir}`);
			} catch (err) {
				logger.error(`Error creating ${directory} directory: ${err}`);
				util.sendError(res, 500, `Error creating ${directory} directory: ${err}`);
				return;
			}
		}

		if (req.files && req.files.length > 0) {
			const oldFile = __dirname + `/../uploads/${req.files[0].filename}`;
			const newFile = newFileDir + req.files[0].filename;

			fs.rename(oldFile, newFile, (err) => {
				if (err) {
					logger.error(`Error in moving file : ${err}`);
					util.sendError(res, 400, `Error in moving file : ${err}`);
					return;
				}

				logger.debug(`File copied to ${newFile}`);
				// include uploaded file path
				const output = {
					filename:`/${directory}/` + req.files[0].filename
				}

				util.sendRes(res, 200, 'OK', output);
			})
		} else {
			const output = {
				folderName:`/${directory}/`
			}
			util.sendRes(res, 200, 'OK', output);
		}
	}
}

module.exports = NasController;