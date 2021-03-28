function getPath(ip) {
    let path = 'users/';
    for (let index = 0; index < 3; index++) {
        path += ip[index].toString();
        path += '-';
    }
    path += ip[3].toString();
    return path;
}

module.exports.getPath = getPath;