'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/***
 * 对外暴露schema
 */
module.exports = new mongoose.Schema({
    name : String,
    create_at : { type : Number, default : new Date().getTime() }, //创建时间
    creator_id : String, //创建人id
    test_cases : [{name:String}], //多个用例
    test_targets:[{test_case_id:Schema.Types.ObjectId,name:String,url:String,body:String,expected:String}] //api
});