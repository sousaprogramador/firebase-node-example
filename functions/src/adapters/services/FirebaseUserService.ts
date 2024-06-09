import { IUserService } from '../../domain/services/IUserService';
import { User } from '../../domain/models/User';
import { db, auth, storage } from '../../config/firebaseConfig';
import * as bcrypt from 'bcrypt';

export class FirebaseUserService implements IUserService {
  async createUser(user: User): Promise<void> {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('email', '==', user.email).get();
    if (!snapshot.empty) {
      throw new Error('Email already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password!, saltRounds);

    const userRecord = await auth.createUser({
      email: user.email,
      password: user.password,
      displayName: user.name,
    });

    user.id = userRecord.uid;
    user.password = hashedPassword;

    await usersRef.doc(user.id).set(user);
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
    await auth.deleteUser(id);
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

  async updatePhoto(userId: string, photoURL: string): Promise<void> {
    await db.collection('users').doc(userId).update({ photoURL });
  }
}
