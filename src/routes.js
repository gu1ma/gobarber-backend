import { Router } from 'express';

import UserController from './app/controllers/userController';
import SessionController from './app/controllers/sessionController';
import FileController from './app/controllers/fileController';
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

routes.post('/files', upload.single('file'), FileController.store);

export default routes;