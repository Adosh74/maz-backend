import colors from 'colors';
import { app } from './app';
import connectDB from './config/database.config';
import config from './config/keys.config';

connectDB();

app.listen(3001, () => {
	console.log(colors.bgGreen(`Server running on port ${config.port}`));
});
