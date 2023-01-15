import express from 'express';
import UserController from '../controller/UserController';
import { IUser } from '../interfaces/IUser';
import validateUser from '../middlewares/validateUser';


const UserRouter = express.Router();


// router.post('/login', loginMiddleware, (req, res) => loginController.login(req, res));

// UserRouter.use(validateUser)

UserRouter.get('/', async (req, res) => {
  const users = await UserController.find();
  res.send(users);
});

UserRouter.get('/:id', async (req, res) => {
  const user = await UserController.findById(req.params.id);
  res.send(user);
});

// UserRouter.post('/', async (req, res) => {
//   const user = await UserController.create(req.body as IUser);
//   res.send(user);
// });

UserRouter.post('/', validateUser, async (req, res) => {
  // validateUser(req, res, async () => {
  const user = await UserController.create(req.body as IUser);
  res.send(user);
});
// });

UserRouter.put('/:id', validateUser,  async (req, res) => {
  const user = await UserController.update(req.params.id, req.body);
  res.send(user);
});

UserRouter.delete('/:id', async (req, res) => {
  const user = await UserController.delete(req.params.id);
  res.send(user);
});



export default UserRouter;