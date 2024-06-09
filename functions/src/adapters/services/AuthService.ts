import { IAuthService } from '../../domain/services/IAuthService';
import { User } from '../../domain/models/User';
import { db, auth } from '../../config/firebaseConfig';
import * as bcrypt from 'bcrypt';

export class AuthService implements IAuthService {
  async register(
    name: string,
    email: string,
    password: string,
    profile: string
  ): Promise<void> {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', email).get();
    if (!snapshot.empty) {
      throw new Error('Email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: name,
    });

    const user: User = {
      id: userRecord.uid,
      name: name,
      email: email,
      password: hashedPassword,
      profile: profile,
    };

    // Garantir que o user.id é uma string
    if (!user.id) {
      throw new Error('User ID is undefined');
    }

    await usersRef.doc(user.id).set(user);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.getUserByEmail(email);
    if (!user || !(await this.verifyPassword(user, password))) {
      throw new Error('Invalid email or password');
    }
    return this.generateToken(user);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const snapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get();
    if (snapshot.empty) return null;
    const user = snapshot.docs[0].data() as User;
    return user;
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password!);
  }

  async generateToken(user: User): Promise<string> {
    return await auth.createCustomToken(user.id!);
  }
}
