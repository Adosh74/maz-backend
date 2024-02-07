import dotenv from 'dotenv';
import { IConfig } from './keys.config';

dotenv.config({ path: `${process.cwd()}/dev.env` });

const {
	NODE_ENV,
	PORT,
	MONGO_URI,
	SMTP_HOST,
	SMTP_PORT,
	SMTP_SERVICE,
	SMTP_USERNAME,
	SMTP_PASSWORD,
	JWT_SECRET,
	JWT_EXPIRES_IN,
	JWT_COOKIE_EXPIRES_IN,
} = process.env;

export default {
	env: NODE_ENV || 'development',
	port: PORT || 3001,
	mongoURI: MONGO_URI || 'mongodb://localhost:27017/app',
	smtpHost: SMTP_HOST || 'smtp',
	smtpPort: parseInt(SMTP_PORT || '') || 587,
	smtpService: SMTP_SERVICE || 'service',
	smtpUsername: SMTP_USERNAME || 'user',
	smtpPassword: SMTP_PASSWORD || 'password',
	jwtSecret: JWT_SECRET || 'secret',
	jwtExpiresIn: JWT_EXPIRES_IN || '5d',
	jwtCookieExpiresIn: parseInt(JWT_COOKIE_EXPIRES_IN || '5'),
} as IConfig;
