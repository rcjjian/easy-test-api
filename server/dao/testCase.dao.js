'use strict';

const {Dao,ObjectId} = require('./dao');

class TestCaseDao extends Dao{

    constructor(){
        super('project'); //实际上 业务逻辑测试用例 信息记录在 project collection里面
        //数据格式化
        this.formatData = (db_data) => {
            return {
                id : db_data._id.toString(),
                name : db_data.name,
                create_at : db_data.create_at,
                creator_id : db_data.creator_id,
                tags : db_data.tags,
                cases : db_data.cases
            }
        }
    }

    async list(project_id,page_index,page_size){
        try{
            if(page_index != null && page_size != null){
                var result = await super.listPage({
                    _id : new ObjectId(project_id),
                },page_index,page_size);
            }else{
                var result = await super.list({
                    _id : new ObjectId(project_id),
                });
            }
            return result;
        }catch(error){
            throw error;
        }
    }

    /***
     * 增加一个测试用例
     * @param project_id 项目id
     * @param test_case {name:测试用例名称}
     * @returns {Promise.<*>}
     */
    async create(project_id,test_case){
        try{
            let result = await super.update({'_id':new ObjectId(project_id)},{
                $push : {
                    "test_cases" : {
                        name : test_case.name
                    }
                }
            });
            return result;
        }catch(error){
            throw error;
        }
    }

    /***
     * 更新测试用例（名称）
     * @param project_id
     * @param test_case_id
     * @param name
     * @returns {Promise.<*>}
     */
    async update(project_id,test_case_id,name){
        try{
            let result = await super.update({'_id':new ObjectId(project_id),'test_cases._id' : new ObjectId(test_case_id)},{
                $set : {
                    'test_cases.$.name' : name
                }
            });
            return result;
        }catch(error){
            throw error;
        }
    }
}


module.exports = new TestCaseDao();