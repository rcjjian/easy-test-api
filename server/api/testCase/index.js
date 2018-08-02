'use strict';

const router = require('koa-router')();
const controller = require('./testCase.controller');

router.get('/list',controller.list);
router.get('/:id',controller.find);
router.post('/create',controller.create);
router.put('/update',controller.update);
router.put('/rename',controller.rename);

module.exports = router;