import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import filterObj from '../utils/filterObj.util';
import * as Factory from './handlerFactory.controller';

// *** user CRUD operations

// +[1] getAllUsers - get all users
export const getAllUsers = Factory.getAll(User);
export const getOneUser = Factory.getOne(User);
export const createUser = Factory.createOne(User);
export const updateUser = Factory.updateOne(User);
export const deleteUser = Factory.deleteOne(User);

// *** getMe - get current user
export const getMe = (req: Request, res: Response, next: NextFunction) => {
	req.params.id = (req as any).user.id;
	next();
};

// *** updateMe - update current user
export const updateMe = async (req: Request, res: Response, next: NextFunction) => {
	// 1) Create error if user POSTs password data
	if (req.body.password || req.body.passwordConfirm) {
		return next({
			statusCode: 400,
			message:
				'This route is not for password updates. Please use /updateMyPassword.',
		});
	}

	// 2) Filtered out unwanted fields names that are not allowed to be updated
	const filteredBody = filterObj(req.body, 'name', 'email');
	// 3) Update user document
	const updatedUser = await User.findByIdAndUpdate((req as any).user.id, filteredBody, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			user: updatedUser,
		},
	});
};
