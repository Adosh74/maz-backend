import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import config from './config/keys.config';
import globalErrorHandler from './controllers/error.controller';
import routes from './routes/index.route';
import AppError from './utils/AppError.util';

export const app = express();

// *** middleware *** //
// parse application/json and url-encoded forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parse cookies
app.use(cookieParser());

// development logging
config.env === 'development' ? app.use(morgan('dev')) : null;

// *** routes *** //
// monitoring route
app.get('/healthz', (req, res) => {
	res.status(200).json({ message: 'OK' });
});

// API routes
app.use('/api/v1', routes);

// handle undefined routes
app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
