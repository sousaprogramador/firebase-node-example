import { IUserService } from '../../interfaces/IUserService';
import { User } from '../../domain/models/User';
import { db } from '../../config/firebaseConfig';
import * as bcrypt from 'bcrypt';

export class FirebaseUserService implements IUserService {
  async createUser(user: User): Promise<void> {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', user.email).get();
    if (!snapshot.empty) {
      throw new Error('Email already exists');
    }

    const newUserRef = usersRef.doc();
    user.id = newUserRef.id;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password!, saltRounds); // O uso de "!" garante que o TypeScript saiba que "password" não é nulo ou indefinido aqui
    user.password = hashedPassword;

    await newUserRef.set({ ...user });
  }

  async getUserById(id: string): Promise<User | null> {
    const userDoc = await db.collection('users').doc(id).get();
    if (userDoc.exists) {
      const user = userDoc.data() as User;
      if (user.password) delete user.password; // Remove o campo de senha
      return user;
    }
    return null;
  }

  async updateUser(id: string, user: User): Promise<void> {
    if (user.email) {
      const usersRef = db.collection('users');
      const snapshot = await usersRef.where('email', '==', user.email).get();
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          if (doc.id !== id) {
            throw new Error('Email already exists');
          }
        });
      }
    }

    if (user.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    }

    await db
      .collection('users')
      .doc(id)
      .update({ ...user });
  }

  async deleteUser(id: string): Promise<void> {
    await db.collection('users').doc(id).delete();
  }

  async getAllUsers(): Promise<User[]> {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map((doc) => {
      const user = doc.data() as User;
      if (user.password) delete user.password; // Remove o campo de senha
      return user;
    });
    return users;
  }
}
