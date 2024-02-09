import { Router } from 'express';
import * as authController from '../../controllers/auth.controller';
import * as userController from '../../controllers/user.controller';

const routes = Router();

// *** Routes *** //

routes.route('/').get(userController.getAllUsers).post(userController.createUser);

// *** Protected routes *** //
routes.use(authController.protect);
// update password
routes.route('/updateMyPassword').patch(authController.updatePassword);

// get current user
routes.route('/me').get(userController.getMe, userController.getOneUser);

// *** restrict to specific roles (middleware) *** //
routes.use(authController.restrictTo('admin'));
routes
	.route('/:id')
	.get(userController.getOneUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

export default routes;
