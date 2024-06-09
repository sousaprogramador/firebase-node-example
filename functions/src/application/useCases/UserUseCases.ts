import { IUserService } from '../../domain/services/IUserService';
import { User } from '../../domain/models/User';

export class UserUseCases {
  constructor(private userService: IUserService) {}

  async createUser(user: User): Promise<void> {
    await this.userService.createUser(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userService.getUserById(id);
  }

  async updateUser(id: string, user: User): Promise<void> {
    await this.userService.updateUser(id, user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  async updatePhoto(userId: string, photoURL: string): Promise<void> {
    await this.userService.updatePhoto(userId, photoURL);
  }
}
