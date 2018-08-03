'use strict';

const router = require('koa-router')();
const controller = require('./testTarget.controller');

router.get('/list',controller.list);
router.get('/:id',controller.find);
router.post('/create',controller.create);
router.put('/update',controller.update);
router.delete('/remove',controller.remove);


module.exports = router;