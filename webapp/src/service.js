let admin = require("firebase-admin");
let serviceAccount = require("D:\\sightpulsplus\\SightPP_VoiceInterface\\webapp\\sight-firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sight-7ddbb-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();

function writeDb(msg, priority) {

    const publicIp = require('public-ip');

    (async () => {
        let ip = await publicIp.v4();

        const splitIP = ip.toString().split('.');
        let path = getPath(splitIP);

        const ref = db.ref(path);
        ref.set({
            object: {
                message: msg,
                priority: priority,
            },
        }).then(r => console.log('..'));
    })();
}

function getPath(ip) {
    let path = 'users/';
    for (let index = 0; index < 3; index++) {
        path += ip[index].toString();
        path += '-';
    }
    path += ip[3].toString();
    return path;
}

module.exports.writeDb = writeDb;