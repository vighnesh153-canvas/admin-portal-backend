const path = require('path');

let _root;

module.exports = (pathString) => {
    return path.join(_root, ...pathString.split('/'));
}

module.exports.setRootPath = rootPath => _root = rootPath;
