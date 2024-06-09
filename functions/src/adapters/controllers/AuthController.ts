import { Request, Response } from 'express';
import { AuthUseCases } from '../../application/useCases/AuthUseCases';
import { NotificationService } from '../services/NotificationService';

export class AuthController {
  constructor(private authUseCases: AuthUseCases) {}

  async register(req: Request, res: Response): Promise<void> {
    const { name, email, password, profile, deviceToken } = req.body;
    try {
      await this.authUseCases.register(name, email, password, profile);

      if (deviceToken) {
        await NotificationService.sendNotification(
          deviceToken,
          'Welcome to Our Service!',
          'Thank you for registering!'
        );
      }

      res.status(201).send('User registered successfully');
    } catch (error) {
      res
        .status(500)
        .send('Error registering user: ' + (error as Error).message);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const token = await this.authUseCases.login(email, password);
      res.status(200).send({ token });
    } catch (error) {
      res.status(500).send('Error logging in: ' + (error as Error).message);
    }
  }
}
