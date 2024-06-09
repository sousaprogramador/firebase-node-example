import { messaging } from '../../config/firebaseConfig';

export class NotificationService {
  static async sendNotification(
    token: string,
    title: string,
    body: string
  ): Promise<void> {
    const message = {
      notification: {
        title: title,
        body: body,
      },
      token: token,
    };

    try {
      const response = await messaging.send(message);
      console.log('Successfully sent message:', response);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  static async sendDataMessage(
    token: string,
    data: { [key: string]: string }
  ): Promise<void> {
    const message = {
      data: data,
      token: token,
    };

    try {
      const response = await messaging.send(message);
      console.log('Successfully sent data message:', response);
    } catch (error) {
      console.error('Error sending data message:', error);
    }
  }
}
