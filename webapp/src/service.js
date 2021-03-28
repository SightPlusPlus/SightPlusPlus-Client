// Adds into the firebase at the ip address

let admin = require("firebase-admin");
let serviceAccount = require("../sight-firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sight-7ddbb-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();

const {getPath} = require("./ip_path");

function writeDb(msg, name, priority) {

    const publicIp = require('public-ip');

    (async () => {
        let ip = await publicIp.v4();

        const splitIP = ip.toString().split('.');
        let path = getPath(splitIP);

        const ref = db.ref(path);
        ref.set({
            object: {
                message: msg,
                name: name,
                priority: priority,
            },
        }).then(r => console.log('..'));
    })();
}

module.exports.writeDb = writeDb;