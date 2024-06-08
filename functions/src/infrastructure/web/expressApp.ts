import express from "express";
import { FirebaseUserService } from "../../adapters/services/FirebaseUserService";
import { UserUseCases } from "../../application/useCases/UserUseCases";
import { UserController } from "../../adapters/controllers/UserController";

const app = express();
app.use(express.json());

const userService = new FirebaseUserService();
const userUseCases = new UserUseCases(userService);
const userController = new UserController(userUseCases);

app.post("/users", userController.createUser);
app.get("/users", userController.getAllUsers);
app.get("/users/:id", userController.getUserById);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

app.use((req, res) => {
  res.status(404).send("Not Found");
});

export default app;
