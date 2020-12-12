import * as admin from 'firebase-admin'
import config from './config.json'

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(config),
        databaseURL: "https://ustadjee-6a886.firebaseio.com"
      });
 }


export default admin