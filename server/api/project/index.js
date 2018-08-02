'use strict';

const router = require('koa-router')();
const controller = require('./project.controller');

router.get('/list',controller.list);
router.get('/:id',controller.find);
router.post('/create',controller.create);
router.put('/rename',controller.rename);
router.put('/update',controller.update);


module.exports = router;