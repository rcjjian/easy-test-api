'use strict';

const {Dao} = require('./dao');

class ProjectDao extends Dao{

    constructor(){
        super('project');
        //数据格式化
        this.formatDataBase = (db_data) => {
            return {
                id : db_data._id,
                name : db_data.name,
                create_at : db_data.create_at,
                creator_id : db_data.creator_id
            }
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