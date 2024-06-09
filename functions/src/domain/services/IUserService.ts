import { User } from '../models/User';

export interface IUserService {
  createUser(user: User): Promise<void>;
  getUserById(id: string): Promise<User | null>;
  updateUser(id: string, user: User): Promise<void>;
  deleteUser(id: string): Promise<void>;
  getAllUsers(): Promise<User[]>;
  updatePhoto(userId: string, photoURL: string): Promise<void>;
}
