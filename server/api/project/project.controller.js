'use strict';

const Controller = require('../controller');

const dao = require('../../dao/project.dao');

class ProjectController extends Controller{

    constructor(){
        super();
    }

    async list(ctx,next){
        super.list(ctx,next);
        //此处加数据格式验证

        let page_index = ctx.query.page_index;
        let page_size = ctx.query.page_size;
        try{
            let result = await dao.listPage({creator_id : 123},page_index,page_size);
            return ctx.response.body = {
                data : result
            };
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async findById(ctx,next){
        super.findById(ctx,next);
        let id = ctx.params.id;
        try{
            let result = await dao.findById(id);
            return ctx.response.body = {
                data : result
            };
        }catch(error){
            throw error;
        }

    }

    async create(ctx,next){
        super.create(ctx,next);
        try{
            let result = await dao.create({
                name : ctx.request.body.name,
                creator_id : 123,
                tags : [],
                cases : []
            });
            ctx.response.status = 200;
            return ctx.response.body = {
                data : result
            };
        }catch(err){
            throw err;
        }
    }

    async rename(ctx,next){
        super.update(ctx,next);
        try{
            let name = ctx.request.body.name;
            let id = ctx.request.body.id;

            let result = await dao.updateOnSet(id,{name});
            ctx.response.status = 200; //下个版本用 中间件方式杀掉你
            return ctx.response.body = {
                ok : result.ok
            };
        }catch(error){
            throw error;
        }
    }

    async remove(ctx,next){
        super.remove(ctx,next);
        try{
            let id = ctx.params.id;
            let result = await dao.removeById(id);
            return ctx.response.body = {
                ok : result.ok
            };
        }catch(error){
            throw error;
        }
    }

};

module.exports = new ProjectController();
