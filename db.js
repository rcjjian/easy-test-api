'use strict';

const mongoose = require('mongoose');
const MODEL_PATH = './server/model';
const fsUtil = require('./server/utils/fileUtil');
const config = require('./config/index');


/***
 * 链接数据库
 */
module.exports = async () => {

    function connection(connect_url,option) {

        mongoose.connect(connect_url,option);

        return new Promise((resolve,reject) => {
            /**
             * 连接成功
             */
            mongoose.connection.on('connected', function () {
                return resolve();
            });
            /**
             * 连接异常
             */
            mongoose.connection.on('error',function (err) {
                return reject(err);
            });
        });
    }


    try{
        console.log('initial db ....');
        let connect_url = config.get('mongodb.url');
        let option = config.get('mongodb.option');
        await connection(connect_url,option);
        let files = await fsUtil.readDir(MODEL_PATH);
        while(files.length > 0){
            let file_name = files.shift();
            let model_name = fsUtil.filename(file_name,true).replace('.model','');
            let Schema = require(MODEL_PATH + '/' + file_name); //初始化 mongodb model
            mongoose.model(model_name,Schema);
        }
    }catch(err){
        console.log(err);
    }
    return mongoose;
};

