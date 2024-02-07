import { Router } from 'express';
import * as authController from '../../controllers/auth.controller';
import * as userController from '../../controllers/user.controller';

const routes = Router();

// *** Routes *** //

// this should be a protected route (only for admins) - for testing purposes only
routes.route('/').get(userController.getAllUsers).post(userController.createUser);

// get current user
routes
	.route('/me')
	.get(authController.protect, userController.getMe, userController.getOneUser);

routes
	.route('/:id')
	.get(userController.getOneUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

export default routes;
