function getPath(arg) {
    let path = 'locations/';
    for (let index = 0; index < arg.length; index++) {
        if (arg[index] === '.') {
            arg = arg.substring(0, index) + '-' + arg.substring(index + 1);
        } else if (arg[index] === ',') {
            arg = arg.substring(0, index) + '+' + arg.substring(index + 1);
        } else if (arg[index] === ' ') {
            arg = arg.substring(0, index) + arg.substring(index + 1);
        }
    }
    path += arg;
    console.log(path);
    return path;
}

module.exports.getPath = getPath;
