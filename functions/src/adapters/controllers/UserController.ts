import { Request, Response } from 'express';
import { UserUseCases } from '../../application/useCases/UserUseCases';

export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      await this.userUseCases.createUser(req.body);
      res.status(201).send('User created successfully');
    } catch (error) {
      res.status(500).send('Error creating user: ' + (error as Error).message);
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userUseCases.getUserById(req.params.id);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(500).send('Error getting user: ' + (error as Error).message);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      await this.userUseCases.updateUser(req.params.id, req.body);
      res.status(200).send('User updated successfully');
    } catch (error) {
      res.status(500).send('Error updating user: ' + (error as Error).message);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await this.userUseCases.deleteUser(req.params.id);
      res.status(200).send('User deleted successfully');
    } catch (error) {
      res.status(500).send('Error deleting user: ' + (error as Error).message);
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userUseCases.getAllUsers();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send('Error getting users: ' + (error as Error).message);
    }
  }

  async updatePhoto(req: Request, res: Response): Promise<void> {
    try {
      const { userId, photoURL } = req.body;
      await this.userUseCases.updatePhoto(userId, photoURL);
      res.status(200).send('User photo updated successfully');
    } catch (error) {
      res
        .status(500)
        .send('Error updating user photo: ' + (error as Error).message);
    }
  }
}
