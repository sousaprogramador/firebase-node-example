import { IUserService } from "../../interfaces/IUserService";
import { User } from "../../domain/models/User";

export class UserUseCases {
  constructor(private userService: IUserService) {}

  createUser(user: User): Promise<void> {
    return this.userService.createUser(user);
  }

  getUserById(id: string): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  updateUser(id: string, user: User): Promise<void> {
    return this.userService.updateUser(id, user);
  }

  deleteUser(id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
}
