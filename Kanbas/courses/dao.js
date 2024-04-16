import * as model from "../model.js";

// low level operations
export const createCourse = (course) => {
    return model.CourseModel.create(course)
};

export const findAllCourses = () => model.CourseModel.find();
export const findCourseById = (cId) => model.CourseModel.findOne({cid : cId});

export const updateCourse = (cId, course) =>  model.CourseModel.updateOne({ cid: cId }, { $set: course });
export const deleteCourse = (Id) => model.CourseModel.deleteOne({ _id: Id });

