'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {

    readDir : (dir_path) => {
        return new Promise((resolve,reject) => {
            fs.readdir(dir_path,(err,files) => {
                return err ? reject(err) : resolve(files);
            });
        });
    },

    isExist : (file_path) => {
        return fs.existsSync(file_path);
    },

    filename : (file_path,no_ext) => {
        return no_ext ? path.basename(file_path,path.extname(file_path)):path.basename(file_path);
    }
};