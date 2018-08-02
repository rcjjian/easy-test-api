'use strict';

const {Dao,ObjectId} = require('./dao');

class TestTargetDao extends Dao{

    constructor(){
        super('project');
    }

    /***
     * 创建一个测试目标api
     * @param projectid
     * @param test_case_id
     * @param test_target
     * @returns {Promise.<void>}
     */
    async create(project_id,test_case_id,test_target){

        let result = await super.update({'_id' : new ObjectId(project_id)},{
            $push:{
                'test_targets' : {
                    'name' : test_target.name || '',
                    'test_case_id' : new ObjectId(test_case_id),
                    'url' : test_target.url || '',
                    'body' : test_target.body || '',
                    'expected' : test_target.expected || ''
                }
        }});

        return result;
    }

};

module.exports = new TestTargetDao();