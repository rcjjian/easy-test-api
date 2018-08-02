'use strict';

const {Dao,ObjectId} = require('./dao');

class TestTargetDao extends Dao{

    constructor(){
        super('project');//操作project表

        //db数据转换 前端规范格式 每一个target 个数据原型
        this.toFrontendFormatBase = db_data => {
            return {
                id : db_data._id.toString(),
                name : db_data.name,
                url : db_data.url,
                body : db_data.body,
                expected : db_data.expected
            }
        }
    }

    /***
     * 创建一个测试目标api,实际就是在project表的test_targets数组增加一条记录
     * @param projectid
     * @param test_case_id
     * @param test_target
     * @returns {Promise.<void>}
     */
    async create(project_id,test_case_id,test_target){
        try{
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
        }catch(error){
            throw error;
        }
    }

    /***
     * 删除一个测试目标api，实际就是在project表的test_targets数组删除一条记录
     * @param project_id
     * @param test_target_id
     * @returns {Promise.<void>}
     */
    async remove(project_id,test_target_id){
        try{
            let result = await super.update({'_id' : new ObjectId(project_id)},{
                $pull : {
                    'test_targets':{
                        _id : new ObjectId(test_target_id)
                    }
                }
            });
            return result;
        }catch(error){
            throw error;
        }
    }

    /***
     * 修改一个测试目标api
     * @param project_id
     * @param test_target_id
     * @param test_target
     * @returns {Promise.<void>}
     */
    async update(project_id,test_target_id,test_target){
        try{
            let result = await super.update({'_id' : new ObjectId(project_id),'test_targets._id' : new ObjectId(test_target_id)},{
                $set : {
                    'test_targets.$.name' : test_target.name || '',
                    'test_targets.$.test_case_id' : new ObjectId(test_target.test_case_id),
                    'test_targets.$.url' : test_target.url || '',
                    'test_targets.$.body' : test_target.body || '',
                    'test_targets.$.expected' : test_target.expected || '',
                }
            });
            return result;
        }catch(error){
            throw error;
        }
    }

    /***
     *  带条件查询
     */
    async listById(project_id,test_case_id){
        let main = this;
        try{
            let result = await super.list({
                _id : new ObjectId(project_id),
                'test_targets.test_case_id' : new ObjectId(test_case_id)
            });
            result = result.map(result_data => {
                return main.toFrontendFormatBase(result_data);
            });
            return result;
        }catch(error){
            throw error;
        }
    }
};

module.exports = new TestTargetDao();