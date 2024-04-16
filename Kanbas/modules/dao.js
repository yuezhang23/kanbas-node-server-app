import * as model from "../model.js";


// low level operations
export const createModule = (module) => {
    return model.ModuleModel.create(module)
};

export const findAllModules = () => model.ModuleModel.find();
export const findModulesByCourse = (cId) => model.ModuleModel.find({course : cId});
export const findModuleById= (mId) => model.ModuleModel.findOne({mid : mId});
export const findModuleByCredentials = (cid, mid) => model.ModuleModel.findOne({ course : cid, mid : mid });
export const updateModule = (mId, module) =>  model.ModuleModel.updateOne({ mid: mId }, { $set: module });
export const deleteModule = (Id) => model.ModuleModel.deleteOne({ _id: Id });
