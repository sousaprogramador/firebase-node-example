import * as functions from 'firebase-functions';
import { app } from './infrastructure/web/expressApp';
import { NotificationService } from './adapters/services/NotificationService';
import { db } from './config/firebaseConfig';

export const api = functions.https.onRequest(app);

export const sendWelcomeNotification = functions.auth
  .user()
  .onCreate(async (user) => {
    const userDeviceToken = await getUserDeviceToken(user.uid);
    if (userDeviceToken) {
      await NotificationService.sendNotification(
        userDeviceToken,
        'Welcome to Our Service!',
        'Thank you for registering!'
      );
    }
  });

async function getUserDeviceToken(uid: string): Promise<string | null> {
  const userDoc = await db.collection('users').doc(uid).get();
  if (userDoc.exists) {
    const userData = userDoc.data();
    return userData?.deviceToken || null;
  }
  return null;
}
