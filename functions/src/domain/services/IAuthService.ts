import { User } from '../models/User';

export interface IAuthService {
  register(
    name: string,
    email: string,
    password: string,
    profile: string
  ): Promise<void>;
  login(email: string, password: string): Promise<string>;
  getUserByEmail(email: string): Promise<User | null>;
  verifyPassword(user: User, password: string): Promise<boolean>;
  generateToken(user: User): Promise<string>;
}
