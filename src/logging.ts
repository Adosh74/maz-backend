import fs from 'fs';
import path from 'path';
import { pino } from 'pino';
import pretty from 'pino-pretty';
import config from './config/keys.config';

const streams: { write: any }[] = [
	config.env === 'production' ? process.stdout : pretty(),
	fs.createWriteStream(path.join(__dirname, '..', 'process.log')),
];

export const LOGGER = pino(
	{
		redact: ['body.password'],
		formatters: {
			bindings: () => ({}),
		},
	},
	pino.multistream(streams)
);
