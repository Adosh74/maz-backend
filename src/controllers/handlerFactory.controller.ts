import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import AppError from '../utils/AppError.util';
import catchAsyncUtil from '../utils/catchAsync.util';

// *** Factory Functions

// +[1] getAll - get all documents from a collection (Model)
export const getAll = (Model: Model<any>) =>
	catchAsyncUtil(async (req: Request, res: Response, next: NextFunction) => {
		const docs = await Model.find();

		res.status(200).json({
			status: 'success',
			results: docs.length,
			data: {
				data: docs,
			},
		});
	});

// +[2] getOne - get one document from a collection (Model) by id
export const getOne = (Model: Model<any>, popOptions?: any) =>
	catchAsyncUtil(async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		let query = Model.findById(id);
		if (popOptions) query = query.populate(popOptions);
		const doc = await query;

		if (!doc) {
			return next(new AppError('No document found with that ID', 404));
		}

		res.status(200).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	});

// +[3] createOne - create one document in a collection (Model)
export const createOne = (Model: Model<any>) =>
	catchAsyncUtil(async (req: Request, res: Response, next: NextFunction) => {
		const doc = await Model.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	});

// +[4] updateOne - update one document in a collection (Model) by id
export const updateOne = (Model: Model<any>) =>
	catchAsyncUtil(async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const doc = await Model.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!doc) {
			return next(new AppError('No document found with that ID', 404));
		}

		res.status(200).json({
			status: 'success',
			data: {
				data: doc,
			},
		});
	});

// +[5] deleteOne - delete one document in a collection (Model) by id
export const deleteOne = (Model: Model<any>) =>
	catchAsyncUtil(async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const doc = await Model.findByIdAndDelete(id);

		if (!doc) {
			return next(new AppError('No document found with that ID', 404));
		}

		res.status(204).json({
			status: 'success',
			data: null,
		});
	});
