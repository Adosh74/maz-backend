import crypto from 'crypto';
import ejs from 'ejs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import { promisify } from 'util';
import config from '../config/keys.config';
import User, { IUserSchema } from '../models/user.model';
import AppError from '../utils/AppError.util';
import catchAsync from '../utils/catchAsync.util';
import sendEmail from '../utils/mail';

// *** Sign JWT token
const signToken = (id: string) =>
	jwt.sign({ id }, config.jwtSecret, {
		expiresIn: config.jwtExpiresIn,
	});

// *** Create and send token
const createSendToken = (user: IUserSchema, statusCode: number, res: Response) => {
	// +[1] Create JWT token
	const token = signToken(user._id);

	// +[2] Set cookie options
	const cookieOptions = {
		expires: new Date(Date.now() + config.jwtCookieExpiresIn * 24 * 60 * 60 * 1000),
		httpOnly: true,
	} as { expires: Date; httpOnly: boolean; secure?: boolean };

	// +[3] Secure cookie only in production
	if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

	// +[4] set cookie
	res.cookie('jwt', token, cookieOptions);

	// +[5] Remove password from output
	user.password = '';

	// +[6] Send response
	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

// *** Signup
export const signup = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		// +[1] Check if user already exists
		const existingUser = await User.findOne({ email: req.body.email });

		if (existingUser) {
			return next(new AppError('User already exists', 400));
		}

		// +[2] Create new user
		const newUser: IUserSchema = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm,
		});

		// +[3] user data to send email
		// const user = {
		// 	name: newUser.name.split(' ')[0],
		// };

		// // +[4] html template path
		// const html = await ejs.renderFile(
		// 	path.join(__dirname, './../mails/welcome.ejs'),
		// 	{
		// 		user,
		// 	}
		// );

		// await sendEmail({
		// 	email: newUser.email,
		// 	subject: 'Welcome to the MAZ Realty!',
		// 	template: 'welcome.ejs',
		// 	data: { user },
		// });

		// +[5] Send token
		createSendToken(newUser, 201, res);
	}
);

// *** login

export const login = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		// +[1] Check if email and password exist
		if (!email || !password) {
			return next(new AppError('Please provide email and password', 400));
		}

		// +[2] Check if user exists && password is correct
		const user = await User.findOne({ email: email }).select('+password');

		if (!user || !(await user.correctPassword(password, user.password))) {
			return next(new AppError('Incorrect email or password', 401));
		}

		// +[3] Send token
		createSendToken(user, 200, res);
	}
);
