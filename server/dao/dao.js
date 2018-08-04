'use strict';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


class Dao {
    constructor(model_name){
        this.model_name = model_name;
    }

    getModel(){
        return mongoose.model(this.model_name);
    }

    async create(add_param){
        return await this.getModel().create(add_param);
    }

    async removeById(id){
        return await this.getModel().remove({_id : ObjectId(id)})
    }

    async list(where){
        return await this.getModel().find(where);
    }

    async listPage(limit_param,page_index,page_size){
        let rows = await this.getModel().where(limit_param).skip(Number(page_index)).limit(Number(page_size)).exec();
        let total_count = await this.getModel().countDocuments(limit_param);
        return {rows,total_count};
    }

    async findById(id){
        return await this.getModel().findById(ObjectId(id));
    }

    /***
     * 更新 $set
     * @param id
     * @param set_param
     */
    async updateOnSet(id,set_param){
        return await this.getModel().update({ _id : ObjectId(id) }, {$set: set_param}).exec();
    }

    async update(where,update_param){
        return await this.getModel().update(where,update_param).exec();
    }

};

module.exports.ObjectId = ObjectId;
module.exports.Dao = Dao;