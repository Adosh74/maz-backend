import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app as server } from './app';
import { LOGGER } from './logging';

dotenv.config({ path: `${process.cwd()}/.env` });

const { PORT, MONGO_URI, env } = process.env;

if (!MONGO_URI || !PORT) {
	LOGGER.error('Please make sure that you have a valid mongoURI and port');
	process.exit(1);
}

mongoose
	.connect(MONGO_URI || '', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then((data) => {
		LOGGER.info(`Connected to MongoDB ${data.connection.name} database`);
		server.listen(PORT, () =>
			LOGGER.info(`Listening on port ${PORT} in ${env} environment`)
		);
	})
	.catch((err) => {
		LOGGER.error(err);
		process.exit(1);
	});
