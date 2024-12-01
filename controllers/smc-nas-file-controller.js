/**
 * SMC NAS의 파일 업로드/다운로드
 *
 * MCI 요청 및 응답 처리
 * 
 * 예제 요청 URL) http://localhost:8001/smc-nas-file/v1/upload
 * 
 */

'use strict'

const util = require('../util/util');
const param = require('../util/param');
const logger = require('../util/logger');

// TEST인 경우 볼륨을 로컬 파일 시스템의 C 드라이브로 잡음
// const runType = 'ACTIVE'      // 운영 : ACTIVE
const runType = 'TEST'          // 테스트 : TEST

// 119.6.3.92:40015

// 로그 출력 여부
const debug = false;


/**
 * @Controller(path="/smc-nas-file/v1/")
 */
class SmcNasFile {

    /**
     * 1. 파일 업로드
     * 
     */

    /**
     * @RequestMapping(path="upload", method="post", upload="true")
     */
     async fileUpload(req, res) {
        if (debug) {
            logger.debug(`SmcNasFile:fileUpload called for path /smc-nas-file/v1/upload`);
        }

        // files 파라미터 값 출력
        //console.dir(req);

        try {
            
            const files = req.files;
        
            // 현재의 파일 정보를 저장할 변수 선언
            let originalname = '',
                name = '',
                mimetype = '',
                size = 0;
            
            if (Array.isArray(files)) {   // 배열에 들어가 있는 경우 (설정에서 1개의 파일도 배열에 넣게 했음)
                if (debug) {
                    logger.debug(`배열에 들어있는 파일 갯수 : ${files.length}`);
                }
                
                for (let index = 0; index < files.length; index++) {
                    originalname = files[index].originalname;
                    name = files[index].filename;
                    mimetype = files[index].mimetype;
                    size = files[index].size;
                }
                
            } else {   // 배열에 들어가 있지 않은 경우 (현재 설정에서는 해당 없음)
                if (debug) {
                    logger.debug(`파일 갯수 : 1 `);
                }
                
                originalname = files.originalname;
                name = files.name;
                mimetype = files.mimetype;
                size = files.size;
            }
            
            if (debug) {
                logger.debug(`현재 파일 정보 : ${originalname}, ${name}, ${mimetype}, ${size}`);
            }
            
            
            // 요청 정보 처리
            //const paramCommand = req.body.command;
            //const paramApp = req.body.app;
            
            //logger.debug(`요청 처리를 위한 DATA : ${paramCommand}, ${paramApp}`);
            
            
            // 1. Source path와 Active 볼륨 패스 확인
            let targetNasPath = nas.active.UNC;
            
            
            // only for TEST : 가장 앞의 드라이브명을 C 드라이브로 변경
            if (runType == 'TEST') {
                targetNasPath = 'C:\\NAS';
                logger.info(`drive in target NAS path replaced to C for TEST only : ${targetNasPath}`);
            }
            
            // 일자를 이용해 폴더 생성 여부 확인하고 없으면 생성
            const targetSubParent2 = moment().format('YYYY_MM_DD');
            
            const targetParent = path.join(targetNasPath, targetSubParent, targetSubParent2);
            if (debug) {
                logger.debug(`target parent : ${targetParent}`);
            }
            
            const exists = fileExistsSync(targetParent);
            if (debug) {
                logger.debug('file exists sync : ' + exists);
            }
            
            // 폴더가 없으면 폴더 생성
            if (!exists) {
                fs.mkdirSync(targetParent, {recursive:true});
                logger.info(`created new folder : ${targetParent}`);
            }
            
            // 타겟 패스 생성
            const targetPath = path.join(targetParent, name);
            if (debug) {
                logger.debug(`target path : ${targetPath}`);
            }
            
            // 소스 패스 생성
            const sourcePath = path.join(__dirname, sourceParent, name);
            if (debug) {
                logger.debug(`source path : ${sourcePath}`);
            }
            
            
            // 2. NAS에 파일 복사
            fs.writeFileSync(targetPath, fs.readFileSync(sourcePath));
            if (debug) {
                logger.debug(`file copy succeeded.`);
            }
            
            console.log(`type = ${typeof(fs.readFileSync(sourcePath))}`)

            const thumbImageContents = this.convertImageToBase64(sourcePath)
            
            // 소스 파일 삭제
            fs.unlinkSync(sourcePath);
            if (debug) {
                logger.debug(`delete succeeded for source file.`);
            }

            
            // 3. 응답 파라미터 생성하여 전송

            //===== Output Params =====//
            // 1. 파일명 : test.jpg
            // 2. 파일경로명 : 1|\NOTI\2016_03_02\test.jpg
            // 3. 파일타입명 : jpg
            // 4. 파일크기값 : 13536
            //=========================//
            
            let outFileName = name;
            let outVolumeFilePath = nas.active.id + '|' + path.sep + path.join(targetSubParent, targetSubParent2, name);
            let outFileType = path.extname(name).substring(1);
            let outFileSize = size;
            
            
            const output = {
                code:200, 
                message:'파일 업로드 성공', 
                originalName:originalname, 
                mimeType:mimetype,
                fileName:outFileName, 
                volumeFilePath:outVolumeFilePath, 
                fileType:outFileType, 
                fileSize:outFileSize,
                thumbImageContents:thumbImageContents
            };

            const outputStr = JSON.stringify(output);
            if (debug) {
                logger.debug(`OUTPUT : ${outputStr}`);
            }
            
            res.writeHead(200, {'Content-Type':'text/plain;charset=utf8'});
            res.write(outputStr);
            res.end();
            
        } catch(err) {
            logger.error(`Error in SmcNasFile:fileUpload -> ${err}`);

            util.sendErr(res, '1001', 400, 'Error in SmcNasFile:fileUpload', 'error', err);
        }
         
    }
 
    /**
     * 2. 파일 다운로드
     * 
     */

    /**
     * @RequestMapping(path="download")
     */
     async fileDownload(req, res) {
        if (debug) {
            logger.debug(`SmcNasFile:fileDownload called for path /smc-nas-file/v1/download`);
        }
 
        // 요청 파라미터 파싱
        const params = param.parse(req);

        try {
            const paramFilePath = params.filepath;
            if (debug) {
                logger.debug(`paramFilePath - volume file path : ${paramFilePath}`);
            }
            
            // 1. '|' 기호를 기준으로 구분
            const volumePathArray = paramFilePath.split('|');
            if (volumePathArray.length < 2) {
                logger.warn(`Error in splitting volumeFilePath.`);
            }
    
            const volumeId = volumePathArray[0];
            const nasSubFilePath = volumePathArray[1];
            
            // 2. 볼륨ID를 이용해 NAS parent path 확인
            if (!nas.hasOwnProperty(volumeId)) {
                if (debug) {
                    logger.debug(`nas 객체에 volumeId 정보가 없음.`);
                }
            } else {
                if (debug) {
                    logger.debug(`nas 객체에 volumeId 정보가 있음.`);
                }
            }
            
            let nasParentPath = nas[volumeId];
            
            // only for TEST : 가장 앞의 드라이브명을 C 드라이브로 변경
            if (runType == 'TEST') {
                nasParentPath = 'C:\\NAS';
                logger.info(`drive in NAS parent path replaced to C for TEST only : ${nasParentPath}`);
            }
            
            
            const filepath = path.join(nasParentPath, nasSubFilePath);
            const filename = path.basename(nasSubFilePath);
            const mimetype = mime.getType(nasSubFilePath);
            
            if (debug) {
                logger.debug(`파일 패스 : ${filepath}`);
                logger.debug(`파일 이름 : ${filename}`);
                logger.debug(`MIME 타입 : ${mimetype}`);
            }
            
            // 파일 크기 확인
            const stats = fs.statSync(filepath);
            const fileSize = stats['size'];
            if (debug) {
                logger.debug(`파일 크기 : ${fileSize}`);
            }
            
            // 클라이언트에 응답 전송
            res.setHeader('Content-disposition', `attachment; filename=${filename}`);
            res.setHeader('Content-type', mimetype);
            res.setHeader('Content-Length', fileSize);
          
            const filestream = fs.createReadStream(filepath);
            filestream.pipe(res);
      
        } catch(err) {
            logger.error(`Error in SmcNasFile:fileDownload -> ${err}`);

            //util.sendErr(res, '1002', 400, 'Error in SmcNasFile:fileDownload', 'error', err);
            util.sendException(res, 'Error in SmcNasFile:fileDownload')
        }
         
    }

    /**
     * 3. 파일 삭제
     * 
     */

    /**
     * @RequestMapping(path="delete")
     */
     async deleteFile(req, res) {
        if (debug) {
            logger.debug(`SmcNasFile:fileDelete called for path /deleteFile-nas-file/v1/delete`);
        }
 
        // 요청 파라미터 파싱
        const params = param.parse(req);

        try {
                 
            const paramFilePath = params.filepath;
            if (debug) {
                logger.debug(`paramFilePath - volume file path : ${paramFilePath}`);
            }
            
            // 1. '|' 기호를 기준으로 구분
            const volumePathArray = paramFilePath.split('|');
            if (volumePathArray.length < 2) {
                logger.warn(`Error in splitting volumeFilePath.`);
            }
    
            const volumeId = volumePathArray[0];
            const nasSubFilePath = volumePathArray[1];
            
            // 2. 볼륨ID를 이용해 NAS parent path 확인
            if (!nas.hasOwnProperty(volumeId)) {
                if (debug) {
                    logger.debug(`nas 객체에 volumeId 정보가 없음.`);
                }
            } else {
                if (debug) {
                    logger.debug(`nas 객체에 volumeId 정보가 있음.`);
                }
            }
            
            let nasParentPath = nas[volumeId];
            
            // only for TEST : 가장 앞의 드라이브명을 C 드라이브로 변경
            if (runType == 'TEST') {
                nasParentPath = 'C:\\NAS';
                logger.info(`drive in NAS parent path replaced to C for TEST only : ${nasParentPath}`);
            }
            
            
            const filepath = path.join(nasParentPath, nasSubFilePath);
            const filename = path.basename(nasSubFilePath);
            const mimetype = mime.getType(nasSubFilePath);
            
            if (debug) {
                logger.debug(`파일 패스 : ${filepath}`);
                logger.debug(`파일 이름 : ${filename}`);
                logger.debug(`MIME 타입 : ${mimetype}`);
            }


            // 파일 삭제

            fs.access(filepath, fs.constants.F_OK, (err) => { // A
                if (err) return console.log('삭제할 수 없는 파일입니다');

                fs.unlinkSync(filepath, (t) => {
                    if (debug) {
                        logger.debug(`${filepath} 를 정상적으로 삭제했습니다.(${t})`);
                    }
                });
            });

    
            
            const output = {
                code:200, 
                message:'파일 삭제 성공', 
                mimeType:mimetype,
                fileName:filename, 
                filepath:filepath, 
            };

            const outputStr = JSON.stringify(output);
            if (debug) {
                logger.debug(`OUTPUT : ${outputStr}`);
            }
            
            res.writeHead(200, {'Content-Type':'text/plain;charset=utf8'});
            res.write(outputStr);
            res.end();
      
        } catch(err) {
            logger.error(`Error in SmcNasFile:deleteFile -> ${err}`);

            //util.sendErr(res, '1002', 400, 'Error in SmcNasFile:fileDownload', 'error', err);
            util.sendException(res, 'Error in SmcNasFile:deleteFile')
        }
         
    }

    /**
     * 4. 이미지 메모 바탕이미지 파일 업로드
     * 
     */

    /**
     * @RequestMapping(path="background-image-file-upload", method="post", upload="true")
     */
     async uploadBackgroundImage(req, res) {
        if (debug) {
            logger.debug(`SmcNasFile:backgroundImageFileUpload called for path /smc-nas-file/v1/background-image-file-upload"`);
        }

        // files 파라미터 값 출력
        //console.dir(req);

        try {
            
            const files = req.files;
            const params = JSON.parse(req.body.params);
        
            // 현재의 파일 정보를 저장할 변수 선언
            let originalname = '',
                name = '',
                mimetype = '',
                size = 0;
            
            if (Array.isArray(files)) {   // 배열에 들어가 있는 경우 (설정에서 1개의 파일도 배열에 넣게 했음)
                if (debug) {
                    logger.debug(`배열에 들어있는 파일 갯수 : ${files.length}`);
                }
                
                for (let index = 0; index < files.length; index++) {
                    originalname = files[index].originalname;
                    name = files[index].filename;
                    mimetype = files[index].mimetype;
                    size = files[index].size;
                }
                
            } else {   // 배열에 들어가 있지 않은 경우 (현재 설정에서는 해당 없음)
                if (debug) {
                    logger.debug(`파일 갯수 : 1 `);
                }
                
                originalname = files.originalname;
                name = files.name;
                mimetype = files.mimetype;
                size = files.size;
            }
            
            if (debug) {
                logger.debug(`현재 파일 정보 : ${originalname}, ${name}, ${mimetype}, ${size}`);
            }
            
            
            // 요청 정보 처리
            //const paramCommand = req.body.command;
            //const paramApp = req.body.app;
            
            //logger.debug(`요청 처리를 위한 DATA : ${paramCommand}, ${paramApp}`);
            
            
            // 1. Source path와 Active 볼륨 패스 확인
            let targetNasPath = nas.active.UNC;
            
            
            // only for TEST : 가장 앞의 드라이브명을 C 드라이브로 변경
            if (runType == 'TEST') {
                targetNasPath = 'C:\\NAS';
                logger.info(`drive in target NAS path replaced to C for TEST only : ${targetNasPath}`);
            }
            
            // 일자를 이용해 폴더 생성 여부 확인하고 없으면 생성
            const targetSubParent2 = params.path;
            
            const targetParent = path.join(targetNasPath, "BACKGROUND_IMAGE", targetSubParent2);
            if (debug) {
                logger.debug(`target parent : ${targetParent}`);
            }
            
            const exists = fileExistsSync(targetParent);
            if (debug) {
                logger.debug('file exists sync : ' + exists);
            }
            
            // 폴더가 없으면 폴더 생성
            if (!exists) {
                fs.mkdirSync(targetParent, {recursive:true});
                logger.warn(`created new folder : ${targetParent}`);
            }
            
            // 타겟 패스 생성
            const targetPath = path.join(targetParent, name);
            if (debug) {
                logger.debug(`target path : ${targetPath}`);
            }
            
            // 소스 패스 생성
            const sourcePath = path.join(__dirname, sourceParent, name);
            if (debug) {
                logger.debug(`source path : ${sourcePath}`);
            }
            
            
            // 2. NAS에 파일 복사
            fs.writeFileSync(targetPath, fs.readFileSync(sourcePath));
            if (debug) {
                logger.debug(`file copy succeeded.`);
            }
            
            // 소스 파일 삭제
            fs.unlinkSync(sourcePath);
            if (debug) {
                logger.debug(`delete succeeded for source file.`);
            }

            
            // 3. 응답 파라미터 생성하여 전송

            //===== Output Params =====//
            // 1. 파일명 : test.jpg
            // 2. 파일경로명 : 1|\NOTI\2016_03_02\test.jpg
            // 3. 파일타입명 : jpg
            // 4. 파일크기값 : 13536
            //=========================//
            
            let outFileName = name;
            let outVolumeFilePath = nas.active.id + '|' + path.sep + path.join("BACKGROUND_IMAGE", targetSubParent2, name);
            let outFileType = path.extname(name).substring(1);
            let outFileSize = size;
            
            
            const output = {
                code:200, 
                message:'파일 업로드 성공', 
                originalName:originalname, 
                mimeType:mimetype,
                fileName:outFileName, 
                volumeFilePath:outVolumeFilePath, 
                fileType:outFileType, 
                fileSize:outFileSize
            };

            const outputStr = JSON.stringify(output);
            if (debug) {
                logger.debug(`OUTPUT : ${outputStr}`);
            }
            
            res.writeHead(200, {'Content-Type':'text/plain;charset=utf8'});
            res.write(outputStr);
            res.end();
            
        } catch(err) {
            logger.error(`Error in SmcNasFile:uploadBackgroundImage -> ${err}`);

            util.sendErr(res, '1001', 400, 'Error in SmcNasFile:uploadBackgroundImage', 'error', err);
        }
         
    }
 
    /**
     * 5. 폴더삭제 (하위파일까지 삭제)
     * 
     */

    /**
     * @RequestMapping(path="delete-folder")
     */
     async deleteFolder(req, res) {
        if (debug) {
            logger.debug(`SmcNasFile:deleteFolder called for path /smc-nas-file/v1/delete-folder"`);
        }
 
        // 요청 파라미터 파싱
        const params = param.parse(req);

        try {
                 
            const folderPathParam = params.folderpath;
            if (debug) {
                logger.debug(`paramFilePath - volume file path : ${folderPathParam}`);
            }
            
            // 1. '|' 기호를 기준으로 구분
            const volumePathArray = folderPathParam.split('|');
            if (volumePathArray.length < 2) {
                logger.warn(`Error in splitting volumeFilePath.`);
            }
    
            const volumeId = volumePathArray[0];
            const nasSubFolderPath = volumePathArray[1];
            
            // 2. 볼륨ID를 이용해 NAS parent path 확인
            if (!nas.hasOwnProperty(volumeId)) {
                if (debug) {
                    logger.debug(`nas 객체에 volumeId 정보가 없음.`);
                }
            } else {
                if (debug) {
                    logger.debug(`nas 객체에 volumeId 정보가 있음.`);
                }
            }
            
            let nasParentPath = nas[volumeId];
            
            // only for TEST : 가장 앞의 드라이브명을 C 드라이브로 변경
            if (runType == 'TEST') {
                nasParentPath = 'C:\\NAS';
                logger.warn(`drive in NAS parent path replaced to C for TEST only : ${nasParentPath}`);
            }
            
            
            const folderpath = path.join(nasParentPath, nasSubFolderPath);
            const foldername = path.basename(nasSubFolderPath);
            const mimetype = mime.getType(nasSubFolderPath);
            
            if (debug) {
                logger.debug(`파일 패스 : ${folderpath}`);
                logger.debug(`파일 이름 : ${foldername}`);
                logger.debug(`MIME 타입 : ${mimetype}`);
            }



            fs.rmdirSync(folderpath, {recursive: true});
            // fs.rmSync(folderpath, { recursive: true, force: true });
    
            
            const output = {
                code:200, 
                message:'폴더 삭제 성공', 
                folderpath:folderpath, 
                foldername:foldername,
                mimetype:mimetype,
            };

            const outputStr = JSON.stringify(output);
            if (debug) {
                logger.debug(`OUTPUT : ${outputStr}`);
            }
            
            res.writeHead(200, {'Content-Type':'text/plain;charset=utf8'});
            res.write(outputStr);
            res.end();
      
        } catch(err) {
            logger.error(`Error in SmcNasFile:deleteFolder -> ${err}`);

            //util.sendErr(res, '1002', 400, 'Error in SmcNasFile:fileDownload', 'error', err);
            util.sendException(res, 'Error in SmcNasFile:deleteFolder')
        }
         
    }
 
    /**
     * 6. 바탕이미지 폴더생성
     * 
     */

    /**
     * @RequestMapping(path="create-background-image-folder")
     */
     async createBackgroundImageFolder(req, res) {
        if (debug) {
            logger.debug(`SmcNasFile:createBackgroundImageFolder called for path /smc-nas-file/v1/create-background-image-folder"`);
        }
 
        // 요청 파라미터 파싱
        const params = param.parse(req);

        try {
                 
            // 1. Source path와 Active 볼륨 패스 확인
            let targetNasPath = nas.active.UNC;
            let index = 0;
            
            // only for TEST : 가장 앞의 드라이브명을 C 드라이브로 변경
            if (runType == 'TEST') {
                targetNasPath = 'C:\\NAS';
                logger.info(`drive in target NAS path replaced to C for TEST only : ${targetNasPath}`);
            }
            
            const targetSubParent2 = params.folderPathParam
            
            const targetParent = path.join(targetNasPath, "BACKGROUND_IMAGE", targetSubParent2);
            if (debug) {
                logger.debug(`target parent : ${targetParent}`);
            }

            let folderPath = targetParent;
            let folderName = targetSubParent2;
            
            let exists = fileExistsSync(folderPath);
            if (debug) {
                logger.debug('file exists sync : ' + exists);
            }
            
            // 폴더가 없으면 폴더 생성
            if (!exists) {
                fs.mkdirSync(folderPath, {recursive:true});
                logger.info(`created new folder : ${targetParent}`);
            } else {
                // 중복 폴더 이름이 있으면 뒤에 숫자로 표시
                while (exists) {

                    index ++;
                    folderPath = `${targetParent} (${index})`;
                    exists = fileExistsSync(folderPath);

                    if (!exists) {
                        fs.mkdirSync(folderPath, {recursive:true});
                        if (debug) {
                            logger.debug(`created new folder : ${folderPath}`);
                        }

                        folderPath = `${targetSubParent2} (${index})`;
                        folderName = `${params.folderNameParam} (${index})`
                        break;
                    }
                }
            }

            
            const output = {
                code:200, 
                message:'폴더 생성 성공',
                data: {
                    folderPath: folderPath,
                    folderName: folderName
                }
            };

            const outputStr = JSON.stringify(output);
            if (debug) {
                logger.debug(`OUTPUT : ${outputStr}`);
            }
            
            res.writeHead(200, {'Content-Type':'text/plain;charset=utf8'});
            res.write(outputStr);
            res.end();
      
        } catch(err) {
            logger.error(`Error in SmcNasFile:createBackgroundImageFolder -> ${err}`);

            //util.sendErr(res, '1002', 400, 'Error in SmcNasFile:fileDownload', 'error', err);
            util.sendException(res, 'Error in SmcNasFile:createBackgroundImageFolder')
        }
         
    }
 
    /**
     * 7. 바탕이미지 폴더명 수정
     * 
     */

    /**
     * @RequestMapping(path="update-background-image-folder")
     */
     async updateBackgroundImageFolder(req, res) {
        logger.debug(`SmcNasFile:updateBackgroundImageFolder called for path /smc-nas-file/v1/update-background-image-folder"`);
 
        // 요청 파라미터 파싱
        const params = param.parse(req);

        try {
                 
            // 1. Source path와 Active 볼륨 패스 확인
            let targetNasPath = nas.active.UNC;
            let index = 0;
            
            // only for TEST : 가장 앞의 드라이브명을 C 드라이브로 변경
            if (runType == 'TEST') {
                targetNasPath = 'C:\\NAS';
                logger.debug(`drive in target NAS path replaced to C for TEST only : ${targetNasPath}`);
            }
            
            const targetOldParent = path.join(targetNasPath, "BACKGROUND_IMAGE", params.oldFolderPath);
            logger.debug(`target old parent : ${targetOldParent}`);
            
            const targetNewParent = path.join(targetNasPath, "BACKGROUND_IMAGE", params.newFolderPath);
            logger.debug(`target new parent : ${targetNewParent}`);
            
            fs.rename(targetOldParent, targetNewParent, (err) => {
                if (err) {
                    logger.error(`Error in SmcNasFile:createBackgroundImageFolder -> ${err}`);
                } else {
                    logger.debug(`SmcNasFile:createBackgroundImageFolder success`)
                }
            })

            
            const output = {
                code:200, 
                message:'폴더명 변경 성공',
                data: 'success'
            };

            const outputStr = JSON.stringify(output);
            if (debug) {
                logger.debug(`OUTPUT : ${outputStr}`);
            }

            res.writeHead(200, {'Content-Type':'text/plain;charset=utf8'});
            res.write(outputStr);
            res.end();
      
        } catch(err) {
            logger.error(`Error in SmcNasFile:updateBackgroundImageFolder -> ${err}`);

            //util.sendErr(res, '1002', 400, 'Error in SmcNasFile:fileDownload', 'error', err);
            util.sendException(res, 'Error in SmcNasFile:updateBackgroundImageFolder')
        }
         
    }


    /**
     * 8. CIS 이미지 개수
     *
     */

    /**
     * @RequestMapping(path="cis-image-count")
     */
    async cisImageCount(req, res) {
        logger.debug(`SmcNasFile:cisImageCount called for path /smc-nas-file/v1/cis-image-count"`);

        // 요청 파라미터 파싱
        const params = param.parse(req);

        try {

            
            let EMR_FOLDER = "N:/mSMISimg/CIS_DATA/EmrRequest/";
            
            // only for TEST : 가장 앞의 드라이브명을 C 드라이브로 변경
            if (runType == 'TEST') {
                EMR_FOLDER = "C:/mSMISimg/CIS_DATA/EmrRequest/";
                logger.debug(`drive in target NAS path replaced to C for TEST only : ${EMR_FOLDER}`);
            }

            let patNo = params.patientId;
            let ordDate = params.orderDate;
            let ordSeqNo = params.orderSerialNo;
            let examCode = params.labCode;
            let spcId = params.specimenId;


            let filebody = EMR_FOLDER + patNo + "-" + ordDate + "_" + ordSeqNo + "_" + examCode + "_" + patNo + "_" + spcId; 

            logger.debug(`target filebody : " +  ${filebody}`);

            let RSTFlag = this.checkRSTFile(filebody);


            logger.debug("RSTFlag : " + RSTFlag);

            if(!RSTFlag) {
                let EMRFlag = this.makeEMRFile(ordDate, ordSeqNo, examCode, patNo, spcId);
                logger.debug("EMRFlag : " + EMRFlag);
            }

            let NUMValue = this.checkNUMFile(filebody);

            const output = {
                code:200,
                message:'OK',
                data: {
                    body: [
                        {
                            count: NUMValue
                        }
                    ]
                }
            }
            util.sendResponse(res, output);

        } catch(err) {
            logger.error(`Error in SmcNasFile:cisImageCount -> ${err}`);

            util.sendErr(res, params.requestCode, 400, 'Error in SmcNasFile:cisImageCount', 'error', err);
        }
    }

    checkRSTFile(filebody) {

        try {
            let filename = filebody + ".RST";

            if (fs.existsSync(filename)) {
                console.log("exists:", filename);

                let data = fs.readFileSync(filename, 'utf8');
                console.log("data: " + data);
               
                var splitData = data.split(',');

                if(splitData.length > 2) {
                    if(splitData[2].trim() == "00") {
                        return true;
                    }
                }

            } else {
                console.log("DOES NOT exist:", filename);
            }

        } catch(err) {
            logger.error(`Error in SmcNasFile:checkRSTFile -> ${err}`);
        }

        return false;
    }


    makeEMRFile(ordDate, ordSeqNo, examCode, patNo, spcId) {
        try {

            let REQUESTED_FOLDER = "N:/mSMISimg/CIS_DATA/Requested/";
            
            // only for TEST : 가장 앞의 드라이브명을 C 드라이브로 변경
            if (runType == 'TEST') {
                REQUESTED_FOLDER = "C:/mSMISimg/CIS_DATA/Requested/";
                logger.debug(`drive in target NAS path replaced to C for TEST only : ${REQUESTED_FOLDER}`);
            }

            let filename = REQUESTED_FOLDER + patNo + "-" + ordDate + "_" + ordSeqNo + "_" + examCode + "_" + patNo + "_" + spcId + ".EMR";

            if (fs.existsSync(filename)) {
                console.log("EMR file exists [", filename, "]");

            } else {
                console.log("making a ew EMR file [", filename, "]");

                let data = patNo + "," + ordDate + "_" + ordSeqNo + "_" + examCode + "_" + patNo + "_" + spcId + "\n";
                fs.writeFileSync(filename, data, 'utf8');
            }

            return true;


        } catch(err) {
            logger.error(`Error in SmcNasFile:checkNUMFile -> ${err}`);
        }

        return false;

    }


    checkNUMFile(filebody) {

        try {
            let filename = filebody + ".NUM";

            let ExistFlag = false;

            for(let i=0 ; i < 60 ; i++) {
                if (fs.existsSync(filename)) {
                    console.log("exists:", filename);
                    ExistFlag = true;
                    break;
                }

                this.sleep(500);
                console.log("DOES NOT exist:", filename);
            }

            if(ExistFlag) {
                let data = fs.readFileSync(filename, 'utf8');
                console.log("data: " + data);
               
                var splitData = data.split(',');

                if(splitData.length > 2) {
                    return parseInt(splitData[2].trim());
                }
            }

        } catch(err) {
            logger.error(`Error in SmcNasFile:checkNUMFile -> ${err}`);
        }

        return -1;
    }

    sleep(ms) {
        const wakeUpTime = Date.now() + ms;
        while (Date.now() < wakeUpTime) {}
    }


    /**
     * 9. CIS 이미지
     *
     */

    /**
     * @RequestMapping(path="cis-image")
     */
    async cisImage(req, res) {
        logger.debug(`SmcNasFile:cisImageCount called for path /smc-nas-file/v1/cis-image"`);

        // 요청 파라미터 파싱
        const params = param.parse(req);

        try {

            let EMR_FOLDER = "N:/mSMISimg/CIS_DATA/EmrRequest/";
            
            let JPEG_FOLDER = "N:/mSMISimg/CIS_DATA/JPegOut/";
            
            // only for TEST : 가장 앞의 드라이브명을 C 드라이브로 변경
            if (runType == 'TEST') {

                EMR_FOLDER = "C:/mSMISimg/CIS_DATA/EmrRequest/";
            
                JPEG_FOLDER = "C:/mSMISimg/CIS_DATA/JPegOut/";

                logger.debug(`drive in target NAS path replaced to C for TEST only : ${EMR_FOLDER}, ${JPEG_FOLDER}`);
            }


            let patNo = params.patientId;
            let ordDate = params.orderDate;
            let ordSeqNo = params.orderSerialNo;
            let examCode = params.labCode;
            let spcId = params.specimenId;
            let index = parseInt(params.index);


            let emrFilebody = EMR_FOLDER + patNo + "-" + ordDate + "_" + ordSeqNo + "_" + examCode + "_" + patNo + "_" + spcId; 

            logger.debug(`target emrFilebody : " +  ${emrFilebody}`);

            let RSTFlag = this.checkRSTFile(emrFilebody);


            logger.debug("RSTFlag : " + RSTFlag);

            if(!RSTFlag) {
                const output = {
                    code:200,
                    message:'OK',
                    data: {
                        body: [
                            {
                                jpegFile: -1
                            }
                        ]
                    }
                }
                util.sendResponse(res, output);

            } else {

                let jpegFolder = JPEG_FOLDER + ordDate + "_" + ordSeqNo + "_" + examCode + "_" + patNo + "_" + spcId + "/";
                let jpegFile = this.getJPEGFile(jpegFolder, index);
                
                const output = {
                    code:200,
                    message:'OK',
                    data: 
                    {
                        body: [
                            {
                                jpegFile: jpegFile
                            }
                        ]
                    }
                }
                util.sendResponse(res, output);
            }

        } catch(err) {
            logger.error(`Error in SmcNasFile:cisImage -> ${err}`);

            util.sendErr(res, params.requestCode, 400, 'Error in SmcNasFile:cisImage', 'error', err);
        }
    }


    getJPEGFile(fileFolder, index) {

        let jpegFile = "";

        try {

            if (fs.existsSync(fileFolder)) {
                console.log("exists:", fileFolder);

                var files = fs.readdirSync(fileFolder);

                console.log("files:", files.length);

                let fileName = fileFolder + files[index];

                console.log("fileName:", fileName);

                if(fs.existsSync(fileName)) {
                    console.log("exists:", fileName);

                    jpegFile = fs.readFileSync(fileName);
                    console.log("jpegFile: " + jpegFile);
                } else {
                    console.log("DOES NOT exist:", fileName);
                }
            } 

        } catch(err) {
            logger.error(`Error in SmcNasFile:getJPEGFile -> ${err}`);
        }

        return jpegFile;
    }

    convertImageToBase64(file) {
        var bitmap = fs.readFileSync(file);
        return new Buffer(bitmap).toString('base64');
    }

}

 


//===== NAS 설정 XML 파일 로딩 =====//

const path = require('path')
const mime = require('mime');
const fs = require('fs');
const moment = require('moment');
 
//===== Source and Target parent path =====//
const sourceParent = "../uploads";
const targetSubParent = "MOBILE";

//===== NAS 파일 업로드를 위한 설정 =====//
// volume id to NAS path mapping
const nas = {};

// volume info filename
const volume_filename = '../config/StorageVolumeInfo.xml';

const iniFilePath = path.join(__dirname, '../config/code.ini');
const decryptFilePath = path.join(__dirname, '../config/DecryptPWD.exe');


/**
 * 명령어 실행
 */
const runCommand = (cmd, args, opts, done) => {
    const spawn = require("child_process").spawn;
    const child = spawn(cmd, args, opts);
    const result = { stdout: "" };

    child.stdout.on("data", function (data) {
    	if (debug) {
            logger.debug('stdout.data event.');
        }

        result.stdout += data;
    });

    child.stdout.on("end", function () {
    	if (debug) {
            logger.debug('stdout.end event.');
        }

        //done(result.stdout, null, null);
    });

    child.on("close", function (code, signal) {
    	if (debug) {
            logger.debug('close event.');
        }

        done(result.stdout, code, null);
    });

    child.on("error", function (err) {
    	if (debug) {
            logger.debug('error event.');
        }

        done(null, null, err);
    });
     
    return result;
}


let targetVolumeId = '';
let targetNasPath = '';

/**
 * 파일이 있는지 확인 (Sync)
 */
 const fileExistsSync = (filepath) => {
	let exists = true;
	try {
	    fs.accessSync(filepath, fs.F_OK);
	} catch(e) {
		exists = false;
	}
	
	return exists;
}


module.exports = SmcNasFile;