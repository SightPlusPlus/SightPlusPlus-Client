// Adds into the database at given coordinates

let admin = require("firebase-admin");
let serviceAccount = require("../sight-firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sight-7ddbb-default-rtdb.europe-west1.firebasedatabase.app"
});

const {getPath} = require("./coordinates");

const db = admin.database();

let args = process.argv.slice(2);

function writeDb(msg, name, priority) {

    (async () => {

        let path = getPath(args[0]);

        const ref = db.ref(path);
        ref.set({
                message: msg,
                name: name,
                priority: priority,
        }).then(r => console.log('..'));
    })();
}

module.exports.writeDb = writeDb;