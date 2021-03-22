//  Gets the public ip address

function getIP() {
    const publicIp = require('public-ip');

    (async () => {
        let ip = await publicIp.v4();
        console.log(ip)
        return ip;
    })();
}

// getIP();
module.exports.getIP = getIP;