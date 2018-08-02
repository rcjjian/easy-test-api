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

    create(add_param){
        let Model = this.getModel();
        return new Promise((resolve,reject) => {
            Model.create(add_param,(err,data) => {
                return err ? reject(err) : resolve(data);
            });
        });
    }

    deleteById(id){
        let Model = this.getModel();
        return new Promise((resolve,reject) => {
            Model.findByIdAndDelete(id,(err,data) => {
                return err ? reject(err) : resolve(data);
            });
        });
    }

    list(limit_param){
        let Model = this.getModel();
        return new Promise((resolve,reject) => {
            Model.find(limit_param,(err,docs) => {
                return err ? reject(err) : resolve(docs);
            });
        });
    }

    listPage(limit_param,page_index,page_size){
        let Model = this.getModel();

        return Promise.all([
            Model.where(limit_param).skip(Number(page_index)).limit(Number(page_size)).exec(),
            Model.countDocuments(limit_param,(err,count) => {
                return err ? 0 : count;
            })
        ]).then(result => {
            return {rows : result[0] ? result[0] : [], total_count : result[1]};
        }).catch(err => {
            return {rows : [], total_count : result[1]};
        });
    }

    /***
     * 查询单个
     */
    findById(id){
        let Model = this.getModel();
        return new Promise((resolve,reject) => {
            Model.findById(id,(err,adventure) => {
                return err ? reject(err) : resolve(adventure);
            });
        });
    }

    updateOnSet(id,set_param){
        let Model = this.getModel();
        return new Promise((resolve,reject) => {
            Model.update({ _id: new ObjectId(id) }, { $set: set_param}).exec((err,data) => {
                return err ? reject(err) : resolve(data);
            });
        });
    }

    update(where,update_param){
        let Model = this.getModel();
        return new Promise((resolve,reject) => {
            Model.update(where,update_param).exec((err,data) => {
                return err ? reject(err) : resolve(data);
            });
        });
    }

};

module.exports.ObjectId = ObjectId;
module.exports.Dao = Dao;