import { Router } from 'express';

import multer from 'multer';
import UserController from './app/controllers/userController';
import SessionController from './app/controllers/sessionController';
import FileController from './app/controllers/fileController';
import ProviderController from './app/controllers/providerController';
import AppointmentController from './app/controllers/appointmentController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

import ScheduleController from './app/controllers/scheduleController';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', async (req, res) => res.json({ message: 'server running! :D' }));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);
routes.get('/providers', ProviderController.index);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);

routes.get('/schedule', ScheduleController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
