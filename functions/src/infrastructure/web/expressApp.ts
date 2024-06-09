import express from 'express';
import { AuthController } from '../../adapters/controllers/AuthController';
import { UserController } from '../../adapters/controllers/UserController';
import { AuthUseCases } from '../../application/useCases/AuthUseCases';
import { UserUseCases } from '../../application/useCases/UserUseCases';
import { AuthService } from '../../adapters/services/AuthService';
import { FirebaseUserService } from '../../adapters/services/FirebaseUserService';

const authService = new AuthService();
const userService = new FirebaseUserService();
const authUseCases = new AuthUseCases(authService);
const userUseCases = new UserUseCases(userService);
const authController = new AuthController(authUseCases);
const userController = new UserController(userUseCases);

const app = express();
app.use(express.json());

app.post('/register', (req, res) => authController.register(req, res));
app.post('/login', (req, res) => authController.login(req, res));
app.post('/users', (req, res) => userController.createUser(req, res));
app.get('/users/:id', (req, res) => userController.getUserById(req, res));
app.put('/users/:id', (req, res) => userController.updateUser(req, res));
app.delete('/users/:id', (req, res) => userController.deleteUser(req, res));
app.get('/users', (req, res) => userController.getAllUsers(req, res));
app.post('/users/photo', (req, res) => userController.updatePhoto(req, res));

export { app };
