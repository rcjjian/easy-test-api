'use strict';

var Config = require('config-js');
var config = new Config('./config/' + (process.env.NODE_ENV || 'development') + '.js');

module.exports = {

    get : (param_name) => {
        return config.get(param_name);
    }


};