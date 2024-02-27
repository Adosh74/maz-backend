import { NextFunction, Request, Response } from 'express';
import Property, { IPropertySchema } from '../models/property.model';
import AppError from '../utils/AppError.util';
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

		const owner = { _id: (req as any).user.id };

		// +[2] create property
		const property = await Property.create({
			name: name,
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
export const updateOneProperty = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// +[1] find property
		const property: IPropertySchema | null = await Property.findById(req.params.id);

		// +[2] check if property exists
		if (!property) {
			return next(new AppError('No property found with that ID', 404));
		}

		// +[3] check if the user is the owner of the property or is an admin
		if (
			property?.owner._id.toString() !== (req as any).user.id &&
			(req as any).user.role !== 'admin'
		) {
			return next(new AppError('You are not allowed to update this property', 403));
		}

		// +[4] update property
		const updatedProperty = await Property.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		// +[5] send response
		res.status(200).json({
			status: 'success',
			data: {
				property: updatedProperty,
			},
		});
	}
);

export const deleteOneProperty = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// +[1] find property
		const property: IPropertySchema | null = await Property.findById(req.params.id);

		// +[2] check if property exists
		if (!property) {
			return next(new AppError('No property found with that ID', 404));
		}

		// +[3] check if the user is the owner of the property or is an admin
		if (
			property?.owner._id.toString() !== (req as any).user.id &&
			(req as any).user.role !== 'admin'
		) {
			return next(new AppError('You are not allowed to delete this property', 403));
		}

		// +[4] delete property
		await property.remove();

		// +[5] send responses
		res.status(204).json({
			status: 'success',
			data: null,
		});
	}
);
