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

        this.formatDataAll = (db_data) => {
            let base = this.formatDataBase(db_data);

        }

    }

    async listPage(limit_param,page_index,page_size){
        let result = await super.listPage(limit_param,page_index,page_size);
        let main = this;
        result.rows = result.rows.map(db_data => {
            return main.formatData(db_data);
        });
        return result;
    }

    async create(add_param){
        let result = await super.create(add_param);
        return this.formatDataBase(result);
    }

}


module.exports = new ProjectDao();