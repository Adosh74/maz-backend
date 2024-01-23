import { app } from './app';
import connectDB from './config/database.config';

connectDB();

app.listen(3001, () => {
	console.log('Server started on port 3001');
});
