import dotenv from 'dotenv';
import { IConfig } from './keys.config';

dotenv.config({ path: `${process.cwd()}/dev.env` });

const {
	NODE_ENV,
	PORT,
	MONGO_URI,
	SENDINBLUE_EMAIL,
	SENDINBLUE_HOST,
	SENDINBLUE_PORT,
	SENDINBLUE_USERNAME,
	SENDINBLUE_PASSWORD,
} = process.env;

export default {
	env: NODE_ENV || 'development',
	port: PORT || 3001,
	mongoURI: MONGO_URI || 'mongodb://localhost:27017/app',
	sendInBlueEmail: SENDINBLUE_EMAIL || '',
	sendInBlueHost: SENDINBLUE_HOST || '',
	sendInBluePort: SENDINBLUE_PORT || 587,
	sendInBlueUsername: SENDINBLUE_USERNAME || '',
	sendInBluePassword: SENDINBLUE_PASSWORD || '',
} as IConfig;
