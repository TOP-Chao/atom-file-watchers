'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _config = require("../config.json");

var _config2 = _interopRequireDefault(_config);

var _units = require("./helper/units");

var _units2 = _interopRequireDefault(_units);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 插件配置选项
 * @type {Object}
 */
var options = {
    showSuccessCompilingNotification: {
        title: 'Show success notification',
        description: 'If you enable. Successful execution the command will give prompt',
        type: 'boolean',
        "default": true,
        order: 10
    },
    parsesCssFiles: {
        title: 'Parse Sass and Less',
        description: 'If you enable. Analytical reference relationship between files. [Example: File A reference file B, modification B, will compile A, B does not compile]',
        type: 'boolean',
        "default": true,
        order: 11
    }
};

//默认的npm全局安装目录
var installationDir = _units2.default.getNpmInstallationDir();
//根据配置文件添加配置选项
_config2.default.forEach(function (watch, index) {
    watch.path = _units2.default.formatPath(watch.path.replace(/\$installationDir\$/g, installationDir));

    options['compile@' + watch.name + '@enabled'] = {
        title: 'Enable \'' + watch.name + '\' watch',
        type: 'boolean',
        "default": false,
        order: index * 4 + 12
    };
    options['compile@' + watch.name + '@match'] = {
        title: 'Matching rule',
        description: 'Matching rules that monitor the file relative to the working directory path. For details, please consult the documentation minimatch',
        type: 'string',
        "default": watch.match,
        order: index * 4 + 13
    };
    options['compile@' + watch.name + '@path'] = {
        title: 'Handler path',
        description: 'Handler the absolute path. Please read the documentation before using',
        type: 'string',
        "default": watch.path,
        order: index * 4 + 14
    };
    options['compile@' + watch.name + '@command'] = {
        title: 'command',
        description: 'Executable command line scripts. Please read the documentation before using',
        type: 'string',
        "default": watch.command,
        order: index * 4 + 15
    };
});

exports.default = options;
module.exports = exports['default'];