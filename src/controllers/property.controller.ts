import Property from '../models/property.model';
import * as Factory from './handlerFactory.controller';

// *** CRUD operation for property

export const getAllProperty = Factory.getAll(Property);
export const getOneProperty = Factory.getOne(Property, 'owner');
export const createOneProperty = Factory.createOne(Property);
export const updateOneProperty = Factory.updateOne(Property);
export const deleteOneProperty = Factory.deleteOne(Property);
