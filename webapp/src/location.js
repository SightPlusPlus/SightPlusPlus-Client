let admin = require("firebase-admin");
let serviceAccount = require("D:\\sightpulsplus\\SightPP_VoiceInterface\\webapp\\sight-firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sight-7ddbb-default-rtdb.europe-west1.firebasedatabase.app"
});

const {getPath} = require("./coordinates");

const db = admin.database();

let args = process.argv.slice(2);

function writeDb(msg, priority) {

    (async () => {

        let path = getPath(args[0]);

        const ref = db.ref(path);
        ref.set({
                message: msg,
                priority: priority,
        }).then(r => console.log('..'));
    })();
}

module.exports.writeDb = writeDb;