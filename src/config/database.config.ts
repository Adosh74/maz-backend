import mongoose from 'mongoose';
import { LOGGER } from '../logging';
import AppError from '../utils/AppError.util';
import config from './keys.config';

const connectDB = () => {
	if (!config.mongoURI) return new AppError('MongoURI not found', 500);
	mongoose
		.connect(config.mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})
		.then((data) =>
			LOGGER.info(`Connected to MongoDB ${data.connection.name} database`)
		)
		.catch((err) => LOGGER.error(err));
};

export default connectDB;
