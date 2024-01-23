import dotenv from 'dotenv';
import { IConfig } from './keys.config';

dotenv.config({ path: `${process.cwd()}/dev.env` });

const { NODE_ENV, PORT } = process.env;

export default {
	env: NODE_ENV || 'development',
	port: PORT || 3001,
} as IConfig;
