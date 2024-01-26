import { Router } from 'express';
import * as userController from '../../controllers/user.controller';

const routes = Router();

// *** Routes *** //

// this should be a protected route (only for admins) - for testing purposes only
routes.route('/').get(userController.getAllUsers).post(userController.createUser);

routes
	.route('/:id')
	.get(userController.getOneUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

export default routes;
