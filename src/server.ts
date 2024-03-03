import dotenv from 'dotenv';
import Redis from 'ioredis';
import mongoose from 'mongoose';
import { app as server } from './app';
import { LOGGER } from './logging';

dotenv.config({ path: `${process.cwd()}/.env` });

const { PORT, MONGO_URI, NODE_ENV, REDIS_URL } = process.env;

if (!MONGO_URI || !PORT || !REDIS_URL) {
	LOGGER.error(
		'Please make sure that you have a valid mongoURI and port number and redis url in your .env file'
	);
	process.exit(1);
}

// *** Redis Connection
export const redisClient = new Redis(REDIS_URL);

redisClient.on('connect', () => {
	LOGGER.info('Connected to Redis');
});

redisClient.on('error', (err) => {
	LOGGER.error(`Redis error: ${err}`);
	process.exit(1);
});

// *** MongoDB Connection and Server Start
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
			LOGGER.info(`Listening on port ${PORT} in ${NODE_ENV} environment`)
		);
	})
	.catch((err) => {
		LOGGER.error(err);
		process.exit(1);
	});
