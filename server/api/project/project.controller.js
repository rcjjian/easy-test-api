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
};

module.exports = new ProjectController();
