'use strict';

const {Dao} = require('./dao');

class ProjectDao extends Dao{

    constructor(){
        super('project');

        //格式化基础数据
        this.formatDataBase = (db_data) => {
            return {
                id : db_data._id,
                name : db_data.name,
                create_at : db_data.create_at,
                creator_id : db_data.creator_id
            }
        };

        //格式化数据
        this.formatData = (db_data) => {
            let base = this.formatDataBase(db_data);
            let test_case_map = objUtil.arrayToMap(db_data.test_cases,'_id');
            let children = new Map();

            while(db_data.test_targets.length > 0){

                let target = db_data.test_targets.shift();
                let test_case_id = target.test_case_id.toString();

                let test_case = test_case_map.get(test_case_id);
                if(test_case != null){
                    if(test_case.target_list == null)test_case.target_list = [];

                    test_case.target_list.push(target);

                    children.set(test_case._id,test_case);
                }
            }
            return Object.assign(base,children);
        }

    }

    /***
     * 查询项目分页
     * @param limit_param
     * @param page_index
     * @param page_size
     * @returns {Promise.<*>}
     */
    async listPage(limit_param,page_index,page_size){
        super.listPage(limit_param,page_index,page_size);
        let main = this;
        try{
            let result = await super.listPage(limit_param,page_index,page_size);
            result.rows = result.rows.map(db_data => {
                return main.formatDataBase(db_data);
            });
            return result;
        }catch(error){
            throw error;
        }
    }

    /***
     * 创建项目
     * @param add_param
     * @returns {Promise.<{id, name, create_at, creator_id}>}
     */
    async create(add_param){
        try{
            let result = await super.create(add_param);
            return this.formatDataBase(result);
        }catch(error){
            throw error;
        }
    }

    async findById(id){
        try{
            let result = await super.findById(id);
            return this.formatData(result);
        }catch(error){
            throw error;
        }
    }

    async remove(id){
        try{
            let result = await super.removeById(id);
            return result;
        }catch(error){
            throw error;
        }
    }

};

module.exports = new ProjectDao();