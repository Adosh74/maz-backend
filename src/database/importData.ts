import fs from 'fs';
import { LOGGER } from '../logging';
import City from '../models/city.model';
import Property from '../models/property.model';
import './mongo';

const properties = JSON.parse(
	fs.readFileSync(`${process.cwd()}/data/properties.json`, 'utf-8')
);

const cities = JSON.parse(fs.readFileSync(`${process.cwd()}/data/cities.json`, 'utf-8'));

const insertData = async () => {
	try {
		await Property.insertMany(properties);
		await City.insertMany(cities);
		LOGGER.info('Data successfully loaded');
	} catch (error) {
		LOGGER.error(error);
	}
	process.exit();
};

const deleteData = async () => {
	try {
		await Property.deleteMany();
		await City.deleteMany();
		LOGGER.info('Data successfully deleted');
	} catch (error) {
		LOGGER.error(error);
	}
	process.exit();
};

if (process.argv[2] === '--import') {
	insertData();
}

if (process.argv[2] === '--delete') {
	deleteData();
}
