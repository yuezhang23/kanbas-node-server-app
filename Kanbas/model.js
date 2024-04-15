import mongoose from "mongoose";
import * as schema from "./schema.js";

export const UserModel = mongoose.model("UserModel", schema.userSchema);
export const ModuleModel = mongoose.model("ModuleModel", schema.moduleSchema);
export const CourseModel = mongoose.model("CourseModel", schema.courseSchema);

