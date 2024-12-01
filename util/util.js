'use strict';

const fs = require('fs');

const util = {};

// logger
const logger = require('./logger');

// sequence code
let seqCode = 0;

/**
 * Send response
 * 
 * @param {object} res res object in express
 * @param {number} code result code
 * @param {string} message result message
 * @param {object} output output object such as database query rows
 */
util.sendRes = function (res, code, message, output) {
    const result = {
        code: code,
        message: message,
        output: output
    }

    util.sendResponse(res, result);
}


/**
 * Send response
 * 
 * @param {object} res res object in express
 * @param {object} output output object such as database query rows
 */
util.sendResponse = function (res, output) {
    if (typeof(output) == 'object') {
        output = JSON.stringify(output);
        //logger.debug('output object converted to json.');
    }
    
    res.writeHead(200, {'Content-Type':'application/json;charset=utf8'});
    res.end(output);
}

/**
 * Send download file response
 * 
 * @param {object} res res object in express
 * @param {object} localPath local file path
 */
 util.sendDownloadResponse = function (res, localPath) {
    res.type("application/octet-stream");
    res.attachment("output.xlsx");
 
    var localFile = fs.createReadStream(localPath, {flags: 'r'} );
 
    localFile.pipe(res);
 
}

/**
 * Send error
 * 
 * @param {object} res res object in express
 * @param {number} code result code
 * @param {string} message result message
 */
util.sendError = function (res, code, message) {
    const output = {
        code: code,
        message: message
    }

    res.writeHead(200, {'Content-Type':'application/json;charset=utf8'});
    res.end(JSON.stringify(output));
}

/**
 * Send error
 * 
 * @param {object} res res object in express
 * @param {number} code result code
 * @param {string} message result message
 */
util.sendErr = function (res, requestCode, code, message, type, details) {
    const output = {
        requestCode: requestCode,
        code: code,
        message: message,
        type: type,
        details: details
    }

    res.writeHead(200, {'Content-Type':'application/json;charset=utf8'});
    res.end(JSON.stringify(output));
}


/**
 * Send error
 * 
 * @param {object} res res object in express
 * @param {number} code result code
 * @param {string} message result message
 */
 util.sendException = function (res, message) {
    res.writeHead(400, {'Content-Type':'application/json;charset=utf8'});
    res.end(message);
}


/**
 * Render view file and send response
 */
util.render = (req, res, targetView, targetContext) => {
    req.app.render(targetView, targetContext, function(err, html) {
        if (err) {
            logger.error('View rendering error : ' + err);
            util.sendError(res, 601, 'View rendering error : ' + err)
            return;
        }

        res.end(html);
    });
}


/**
 * replace # character in the sql statement
 */
util.replace = (strData, strTextToReplace, strReplaceWith, replaceAt) => {
    logger.debug('replace called -> ' + typeof(strData) + ', ' + JSON.stringify(strData));

    var index = strData.indexOf(strTextToReplace);
    for (var i = 1; i < replaceAt; i++) {
        index = strData.indexOf(strTextToReplace, index + 1);
    }

    if (index >= 0) {
        return strData.substr(0, index) + strReplaceWith + strData.substr(index + strTextToReplace.length, strData.length);
    }

    return strData;
}



/*
 * Generate request code (using time and sequence)
 */
util.generateRequestCode = () => {
    const date = new Date();

    const seqCodeStr = util.getSeqCode();

    const components = [
        date.getFullYear(),
        ("0" + (date.getMonth() + 1)).slice(-2),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds(),
        seqCodeStr
    ];

    const curCode = components.join("");
    return curCode;
}

/*
 * Get a sequence code (01 ~ 99)
 */
util.getSeqCode = () => {
    seqCode += 1;
    if (seqCode > 99) {
        seqCode = 0;
    }
    let seqCodeStr = String(seqCode);
    if (seqCodeStr.length == 1) {
        seqCodeStr = '0' + seqCodeStr;
    }

    return seqCodeStr;
}


/**
 * handleUploadFileRaw 함수에 대한 Promise 반환
 */
util.handleUploadFile = (filename, files, oldFolder, newFolder, pathFolder) => {
    return new Promise((resolve, reject) => {
        util.handleUploadFileRaw(filename, files, oldFolder, newFolder, pathFolder, (err, success) => {
            if (err) {
                reject(err)
                return
            }

            resolve(success)
        })
    })
}

/**
 * 업로드된 파일을 지정한 폴더로 이동
 */
util.handleUploadFileRaw = (filename, files, oldFolder, newFolder, pathFolder, callback) => {
  if (files.length > 0) {
    let targetFilename;
    if (typeof(filename) == 'undefined') {
        targetFilename = files[0].filename;
    } else {
        targetFilename = filename;
    }

    const oldFile = __dirname + oldFolder + files[0].filename;
    const newFile = __dirname + newFolder + targetFilename;

    fs.rename(oldFile, newFile, (err) => {
        if (err) {
            logger.error('Error in moving file : ' + err);
            callback('Error in moving file : ' + err, null)
            return;
        }

        logger.debug('File copied to ' + newFile);

        callback(null, pathFolder + targetFilename)
    })
  }	else {
    logger.error('Count of uploaded file is 0.');
    callback('Count of uploaded file is 0.', null)
    return;
  }
}



// Socket.IO를 통한 메시지 전송 Broadcast로 응답 메시지 전송 메소드
util.sendData = async (io, receiver_socket_id, event_name, data, callback) => {
    logger.debug('sendData called : ' + receiver_socket_id + ', ' + event_name);
    

    const sockets = await io.fetchSockets();
    const targetSockets = sockets.filter(item => (item.id == receiver_socket_id));

    if (targetSockets && targetSockets.length > 0) {
 
        for (let i = 0; i < targetSockets.length; i++) {
            targetSockets[i].emit(event_name, data);
        }
        
        callback(null);
    } else {
        logger.debug('target in io.sockets.connected not exist.');
        
        callback('연결된 타겟 에이전트를 찾을 수 없습니다.');
    }
 
}
 



module.exports = util;
