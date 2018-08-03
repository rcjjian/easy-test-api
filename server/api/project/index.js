'use strict';

const router = require('koa-router')();
const controller = require('./project.controller');

router.get('/list',controller.list);
router.get('/:id',controller.findById);
router.post('/create',controller.create);
router.put('/rename',controller.rename);
router.put('/update',controller.update);
router.delete('/:id',controller.remove);


module.exports = router;