import dotenv from 'dotenv';
import { IConfig } from './keys.config';

dotenv.config();

const { NODE_ENV, PORT } = process.env;

export default {
	env: NODE_ENV || 'development',
	port: PORT || 3001,
} as IConfig;
