import { Request, Response } from 'express';
import { UserUseCases } from '../../application/useCases/UserUseCases';
import { User } from '../../domain/models/User';

export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  createUser = async (req: Request, res: Response): Promise<void> => {
    const user: User = req.body;
    try {
      await this.userUseCases.createUser(user);
      res.status(201).send('User created successfully');
    } catch (error) {
      if ((error as Error).message === 'Email already exists') {
        res.status(400).send('Email already exists');
      } else {
        res
          .status(500)
          .send('Error creating user: ' + (error as Error).message);
      }
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    try {
      const user = await this.userUseCases.getUserById(userId);
      if (user) {
        delete user.password; // Remove o campo de senha antes de enviar a resposta
        res.status(200).send(user);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(500).send('Error getting user: ' + (error as Error).message);
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const updatedUser: User = req.body;
    try {
      await this.userUseCases.updateUser(userId, updatedUser);
      res.status(200).send('User updated successfully');
    } catch (error) {
      if ((error as Error).message === 'Email already exists') {
        res.status(400).send('Email already exists');
      } else {
        res
          .status(500)
          .send('Error updating user: ' + (error as Error).message);
      }
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    try {
      await this.userUseCases.deleteUser(userId);
      res.status(200).send('User deleted successfully');
    } catch (error) {
      res.status(500).send('Error deleting user: ' + (error as Error).message);
    }
  };

  getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userUseCases.getAllUsers();
      // Remove o campo de senha de cada usuário antes de enviar a resposta
      const usersWithoutPasswords = users.map((user) => {
        delete user.password;
        return user;
      });
      res.status(200).send(usersWithoutPasswords);
    } catch (error) {
      res.status(500).send('Error listing users: ' + (error as Error).message);
    }
  };
}
