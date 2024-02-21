import { Router } from 'express';
import * as authController from './../../controllers/auth.controller';
import * as propertyController from './../../controllers/property.controller';

const routes = Router();

routes
	.route('/')
	.get(propertyController.getAllProperty)
	.post(authController.protect, propertyController.createOneProperty);

routes
	.route('/:id')
	.get(propertyController.getOneProperty)
	.patch(propertyController.updateOneProperty)
	.delete(propertyController.deleteOneProperty);

export default routes;
