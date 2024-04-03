import express from 'express'
import Hello from './hello.js'
import Lab5 from './Lab5.js'
import cors from "cors";
import CourseRoutes from './Kanbas/courses/routes.js';
import ModuleRoutes from './Kanbas/modules/routes.js';
import AssignmentsRoutes from './Kanbas/courses/assignments/routes.js';


// create http server
const app = express()

// generally everything from cors
app.use(cors());
app.use(express.json());
ModuleRoutes(app);
CourseRoutes(app);
AssignmentsRoutes(app);
Hello(app);
Lab5(app);
app.listen(process.env.PORT || 4000);     