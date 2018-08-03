'use strict';

const Controller = require('../controller');
const dao = require('../../dao/testTarget.dao');

class TestTargetController extends Controller{

    constructor(){
        super();
    }

    async create(ctx,next){
        super.create(ctx,next);
        let project_id = ctx.request.body.project_id;
        let test_case_id = ctx.request.body.test_case_id;
        let test_target = ctx.request.body.test_target;

        let result = await dao.create(project_id,test_case_id,test_target);

        ctx.response.body = {
            ok : result.ok
        };
    }

    async remove(ctx,next){
        super.remove(ctx,next);
        let project_id = ctx.request.body.project_id;
        let id = ctx.request.body.id;
        try{
            let result = await dao.remove(project_id,id);
            ctx.response.body = {
                ok : result.ok
            };
        }catch(error){
            throw error;
        }
    }

    async list(){

    }

    async update(ctx,next){
        super.update(ctx,next);
        let project_id = ctx.request.body.project_id;
        let id = ctx.request.body.id;
        let test_target = ctx.request.body.test_target;
        try{
            let result = await dao.update(project_id,id,test_target);
            return ctx.response.body = {
                ok : result.ok
            };
        }catch(error){
            throw error;
        }
    }

};

module.exports = new TestTargetController();