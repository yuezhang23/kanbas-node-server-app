import Hello from './hello.js'
import Lab5 from './Lab5.js'
import cors from "cors";
import UserRoutes from "./Kanbas/Users/routes.js";
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentsRoutes from './Kanbas/assignments/routes.js';
import mongoose from 'mongoose';
import express from 'express'
import "dotenv/config";
import session from "express-session";


const CONNECTION_STRING = process.env.DB_CONNECTION_STRING 
mongoose.connect(CONNECTION_STRING);

// create http server
const app = express()
app.use(
  cors(
      {
        credentials: true,
        origin: [process.env.FRONTEND_URL, "http://localhost:3000"]   
      }
    )
  );

app.use(express.json());

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
    

ModuleRoutes(app);
CourseRoutes(app);
AssignmentsRoutes(app);
UserRoutes(app);
Hello(app);
Lab5(app);
app.listen(process.env.PORT || 4000);     



