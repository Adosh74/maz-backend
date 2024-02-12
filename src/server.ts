import colors from 'colors';
import mongoose from 'mongoose';
import { app } from './app';
// import connectDB from './config/database.config';
import config from './config/keys.config';
import AppError from './utils/AppError.util';

// connectDB();

if (!config.mongoURI) new AppError('MongoURI not found', 500);
mongoose
	.connect(config.mongoURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then((data) => {
		console.log(colors.bgMagenta(`${data.connection.name} 'connected to MongoDB`));

		app.listen(3001, () => {
			console.log(colors.bgGreen(`Server running on port ${config.port}`));
		});
	})
	.catch((err) => console.log(err));
