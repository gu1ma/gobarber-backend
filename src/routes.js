import { Router } from 'express';

import User from './app/models/user';
import UserController from './app/controllers/userController';

const routes = new Router();

routes.get('/', async (req, res) => {
    return res.json({ message: 'server running! :D' });
});

routes.post('/users', UserController.store);

export default routes;