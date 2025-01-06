const admin = require('firebase-admin')
require('dotenv').config()
const serviceAccount = {
    project_id:process.env.FIREBASE_PROJECT_ID,
    private_key : process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email :process.env.FIREBASE_CLIENT_EMAIL
}
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:process.env.FIREBASE_DATABASE_URL,
    storageBucket:process.env.FIREBASE_STORAGE_BUCKET
})
const database = admin.database()
const storageBucket = admin.storage().bucket()
const databaseBasePath = "Interior_Magnus"
const storageBasePath = "Interior_Magnus"
module.exports={database,storageBucket,databaseBasePath,storageBasePath}
