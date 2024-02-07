import devConfig from './dev.config';

export interface IConfig {
	env: string;
	port: number;
	mongoURI?: string;
	smtpHost?: string;
	smtpPort?: number;
	smtpService?: string;
	smtpUser?: string;
	smtpPass?: string;
	jwtSecret: string;
	jwtExpiresIn: string;
	jwtCookieExpiresIn: number;
}
let config: IConfig = {
	env: 'development',
	port: 3001,
	jwtSecret: 'my-secret',
	jwtExpiresIn: '5d',
	jwtCookieExpiresIn: 5,
};

if (process.env.NODE_ENV === 'development') {
	config = devConfig;
}

export default config;
