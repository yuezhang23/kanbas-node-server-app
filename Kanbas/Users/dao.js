import model from "./model.js";


// low level operations
export const createUser = (user) => {
    delete user._id;
    return model.create(user)
};
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);

// same as filter by the params 
export const findUsersByRole = (role) => model.find({ role: role });

export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });
export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });

// high level APIs

