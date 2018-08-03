'use strict';

/***
 * 控制器的基类 暂作为 接口标准命名规范使用
 */
class Controller{

    constructor(){}

    async list(ctx,next){
    }

    /***
     * 根据id查询一个
     */
    async findById(ctx,next){

    }

    async find(ctx,next){

    }

    async create(ctx,next){
        console.log('create project');
    }

    async update(ctx,next){

    }

    async remove(ctx,next){

    }

};

module.exports = Controller;