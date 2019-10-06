import { Router } from 'express';

import UserController from './app/controllers/userController';
import SessionController from './app/controllers/sessionController';
import authMiddleware from './app/middlewares/auth';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', async (req, res) => {
    return res.json({ message: 'server running! :D' });
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), (req, res) => {
    return res.json({ ok: true });
});

export default routes;