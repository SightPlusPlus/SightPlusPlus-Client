// function getAddress() {
//     const publicIp = require('public-ip');
//     const ipLocate = require("node-iplocate");
//
//     (async () => {
//         let ip = await publicIp.v4();
//         ipLocate(ip).then(function (results) {
//             console.log("IP Address: " + results.ip);
//             console.log("Country: " + results.country + " (" + results.country_code + ")");
//             console.log("Continent: " + results.continent);
//             console.log("Organisation: " + results.org + " (" + results.asn + ")");
//
//             console.log(JSON.stringify(results, null, 2));
//         });
//     })();
// }
//
// getAddress();
// module.exports.getAddress = getAddress;
