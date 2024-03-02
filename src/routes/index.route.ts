import { Router } from 'express';
import authRoutes from './APIs/auth.route';
import propertyRoutes from './APIs/property.route';
import userRoutes from './APIs/user.route';
import userFavoriteRoutes from './APIs/userFavorite.route';

const routes = Router();

// *** Routes *** //

routes.use('/users', userRoutes);
routes.use('/auth', authRoutes);
routes.use('/properties', propertyRoutes);
routes.use('/favorites', userFavoriteRoutes);

export default routes;
