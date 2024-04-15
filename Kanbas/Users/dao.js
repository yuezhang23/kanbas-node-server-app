import * as model from "../model.js";


// low level operations
export const createUser = (user) => {
    delete user._id;
    return model.UserModel.create(user)
};
export const findAllUsers = () => model.UserModel.find();
export const findUserById = (userId) => model.UserModel.findById(userId);

// same as filter by the params 
export const findUsersByRole = (role) => model.UserModel.find({ role: role });

export const findUserByUsername = (username) =>  model.UserModel.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  model.UserModel.findOne({ username, password });
export const updateUser = (userId, user) =>  model.UserModel.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.UserModel.deleteOne({ _id: userId });
