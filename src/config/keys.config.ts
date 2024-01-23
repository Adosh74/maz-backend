import devConfig from './dev.config';

export interface IConfig {
	env: string;
	port: number;
	mongoURI?: string;
}
let config: IConfig = {
	env: 'development',
	port: 3001,
};

if (process.env.NODE_ENV === 'development') {
	config = devConfig;
}

export default config;
