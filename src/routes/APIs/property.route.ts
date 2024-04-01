import { Router } from 'express';
import upload from '../../middleware/upload.middleware';
import * as authController from './../../controllers/auth.controller';
import * as propertyController from './../../controllers/property.controller';

const routes = Router();

routes
	.route('/')
	.get(propertyController.getAllProperty)
	.post(upload, authController.protect, propertyController.createOneProperty);

routes
	.route('/:id')
	.get(propertyController.getOneProperty)
	.patch(propertyController.updateOneProperty)
	.delete(propertyController.deleteOneProperty);

export default routes;
