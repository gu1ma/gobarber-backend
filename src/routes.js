import { Router } from 'express';

import UserController from './app/controllers/userController';
import SessionController from './app/controllers/sessionController';

const routes = new Router();

routes.get('/', async (req, res) => {
    return res.json({ message: 'server running! :D' });
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

export default routes;