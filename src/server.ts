import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app as server } from './app';
import config from './config/keys.config';
import { LOGGER } from './logging';

dotenv.config({ path: `${process.cwd()}/dev.env` });

const { port, mongoURI, env } = config;

if (!mongoURI || !port) {
	LOGGER.error('Please make sure that you have a valid mongoURI and port');
	process.exit(1);
}

mongoose
	.connect(mongoURI || '', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then((data) => {
		LOGGER.info(`Connected to MongoDB ${data.connection.name} database`);
		server.listen(port, () =>
			LOGGER.info(`Listening on port ${port} in ${env} environment`)
		);
	})
	.catch((err) => {
		LOGGER.error(err);
		process.exit(1);
	});
