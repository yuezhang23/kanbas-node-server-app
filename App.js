import Hello from './hello.js'
import Lab5 from './Lab5.js'
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentsRoutes from './Kanbas/assignments/routes.js';
import mongoose from 'mongoose';
import express from 'express'
import cors from "cors";
import "dotenv/config";
import session from "express-session";


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "http://localhost:4000"
mongoose.connect(CONNECTION_STRING);

// create http server
const app = express()

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:3000", 
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie : {
    sameSite: 'strict', 
    secure: false, 
    httpOnly: true ,
  },
};


if (process.env.NODE_ENV === "development_render") {
  sessionOptions.proxy = true;
  sessionOptions.cookie.domain = process.env.HTTP_SERVER_DOMAIN;
  sessionOptions.cookie.sameSite ='none', 
  sessionOptions.cookie.secure = true
}


app.use(session(sessionOptions));
app.use(express.json());

ModuleRoutes(app);
CourseRoutes(app);
AssignmentsRoutes(app);
UserRoutes(app);
Hello(app);
Lab5(app);  
app.listen(process.env.PORT || 4000);      

