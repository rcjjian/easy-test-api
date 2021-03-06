'use strict';

const Controller = require('../controller');
const dao = require('../../dao/testCase.dao');

class TestCaseController extends Controller{

    constructor(){
        super();
    }

    async list(ctx,next){
        super.list(ctx,next);
        let project_id = ctx.request.body.project_id;
        dao.list()

    }

    async create(ctx,next){
        super.create(ctx,next);

        let project_id = ctx.request.body.project_id;
        let test_case = ctx.request.body.test_case; // 测试用例

        let result = await dao.create(project_id,test_case);

        ctx.response.status = 200;

        ctx.response.body = {
            ok : result.ok,
            data : {
                project_id : project_id
            }
        };
    }

    async rename(ctx,next){
        super.update(ctx,next);

        let project_id = ctx.request.body.project_id;
        let test_case_id = ctx.request.body.test_case_id; // 测试用例
        let name = ctx.request.body.name; //测试用例名称

        try{
            let result = await dao.update(project_id,test_case_id,name);
            ctx.response.body = {
                ok : result.ok,
            }
        }catch(error){
            throw error;
        }
    }
};

module.exports = new TestCaseController();