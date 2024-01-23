import mongoose from 'mongoose';
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
		.then((data) => console.log(data.connection.name, 'connected to MongoDB'))
		.catch((err) => console.log(err));
};

export default connectDB;
