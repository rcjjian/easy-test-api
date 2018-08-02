'use strict';

const router = require('koa-router')();
const ROUTE_PATH = './server/api'; //路由默认地址
const path = require('path');
const fsUtil = require('./server/utils/fileUtil');

/***
 * 初始化路由
 * @param app
 * @returns {Promise.<void>}
 */
module.exports = async app => {

    console.log('initial router ....');
    try{
        let files = await fsUtil.readDir(ROUTE_PATH);
        while(files.length){
            let file_name = files.shift();
            let route_path = path.join(__dirname,ROUTE_PATH + '/' + file_name);
            if(fsUtil.isExist(route_path + '/index.js')){
                let route_target = require(route_path);
                router.use('/api/' + file_name,route_target.routes(),route_target.allowedMethods());
            }else{
                console.log(ROUTE_PATH + '/' + file_name + '/index does not exist !');
            }
        }

        //设置一个首页请求
        router.get('/',(ctx,next) => {
            ctx.body = {msg : 'Welcome to easy-project-test!!'}
        });

        app.use(router.routes());

    }catch(error){
        console.log(error);
    }
};