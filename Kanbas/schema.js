import mongoose from "mongoose";
export const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    email: String,
    lastName: String,
    dob: Date,
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY", "ADMIN", "USER"],
      default: "USER",},
  },
  { collection: "Users" });

  
export const moduleSchema = new mongoose.Schema({
    mid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    course: { type: String, required: true },
    lessons: [
        {
        lid: { type: String },
        lname: { type: String},
        description: [ String ],
        module: { type: String },
        },
    ]
},
{ collection: "Modules" });


export const courseSchema = new mongoose.Schema({
   
    cid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    number: { type: String },
    department: { type: String },
    credits: {type : Number},
    startDate: { type: String },
    endDate:  { type: String },
    description: { type: String },
    image: { type: String },
    author: { type: String }
},

{ collection: "Courses" });

