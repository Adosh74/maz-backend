import User from '../models/user.model';
import * as Factory from './handlerFactory.controller';

// *** user CRUD operations

// +[1] getAllUsers - get all users
export const getAllUsers = Factory.getAll(User);
export const getOneUser = Factory.getOne(User);
export const createUser = Factory.createOne(User);
export const updateUser = Factory.updateOne(User);
export const deleteUser = Factory.deleteOne(User);
