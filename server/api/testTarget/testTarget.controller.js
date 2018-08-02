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

    async update(){

    }

};

module.exports = new TestTargetController();