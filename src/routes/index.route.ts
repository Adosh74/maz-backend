import { Router } from 'express';
import authRoutes from './APIs/auth.route';
import userRoutes from './APIs/user.route';

const routes = Router();

// *** Routes *** //

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);

export default routes;
