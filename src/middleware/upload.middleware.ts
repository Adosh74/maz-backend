import multer from 'multer';
import path from 'path';
import AppError from '../utils/AppError.util';

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/properties');
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		const extension = path.extname(file.originalname);
		cb(null, 'property' + '-' + uniqueSuffix + extension);
		// add file name to the req.body.images
		if (!req.body.images && file.mimetype.startsWith('image')) {
			req.body.images = [];

			req.body.images.push('property' + '-' + uniqueSuffix + extension);
		} else if (file.mimetype.startsWith('image') && req.body.images) {
			req.body.images.push('property' + '-' + uniqueSuffix + extension);
		}
		if (file.mimetype === 'application/pdf') {
			req.body.contract = 'property' + '-' + uniqueSuffix + extension;
		}
	},
});

const upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		console.log(file.mimetype);

		if (
			file.mimetype.startsWith('image') ||
			file.mimetype.startsWith('application/pdf')
		) {
			cb(null, true);
		} else {
			cb(
				new AppError('Not an image or pdf! Please upload only images or pdf', 400)
			); // Removed the 'null' argument
		}
	},
}).fields([
	{
		name: 'images',
		maxCount: 7,
	},
	{
		name: 'contract',
		maxCount: 1,
	},
]);

export default upload;
