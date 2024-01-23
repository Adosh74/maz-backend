import dotenv from 'dotenv';
import { IConfig } from './keys.config';

dotenv.config({ path: `${process.cwd()}/dev.env` });

const { NODE_ENV, PORT, MONGO_URI } = process.env;

export default {
	env: NODE_ENV || 'development',
	port: PORT || 3001,
	mongoURI: MONGO_URI || 'mongodb://localhost:27017/app',
} as IConfig;
