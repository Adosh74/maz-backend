import { Router } from 'express';
import userRoutes from './APIs/user.route';

const routes = Router();

// *** Routes *** //

routes.use('/users', userRoutes);

export default routes;
