import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';

dotenv.config();

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS!);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();
const messaging = admin.messaging();

// Use Firestore emulator if it's running
if (process.env.FIRESTORE_EMULATOR_HOST) {
  db.settings({
    host: process.env.FIRESTORE_EMULATOR_HOST,
    ssl: false,
  });
}

// Storage emulator configuration (manual URL setting for testing purposes)
if (process.env.FIREBASE_STORAGE_EMULATOR_HOST) {
  const [host, port] = process.env.FIREBASE_STORAGE_EMULATOR_HOST.split(':');
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = `http://${host}:${port}`;
}

export { db, auth, storage, messaging };
