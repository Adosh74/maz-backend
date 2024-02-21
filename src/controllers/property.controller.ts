import { NextFunction, Request, Response } from 'express';
import Property from '../models/property.model';
import catchAsync from '../utils/catchAsync.util';
import * as Factory from './handlerFactory.controller';

// *** CRUD operation for property

export const getAllProperty = Factory.getAll(Property);
export const getOneProperty = Factory.getOne(Property, 'owner');
// export const createOneProperty = Factory.createOne(Property);
export const createOneProperty = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, description, price, address, images, contract, location } =
			req.body;

		const owner = (req as any).user.id;

		// +[2] create property
		const property = await Property.create({
			name,
			description,
			price,
			address,
			images,
			contract,
			location,
			owner,
		});

		// +[3] send response
		res.status(201).json({
			status: 'success',
			data: {
				property,
			},
		});
	}
);
export const updateOneProperty = Factory.updateOne(Property);
export const deleteOneProperty = Factory.deleteOne(Property);
