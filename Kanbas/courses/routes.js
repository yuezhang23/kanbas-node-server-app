// import db from "../Database/index.js";
import * as dao from "./dao.js";

export default function CourseRoutes(app) {
 
  // app.post("/api/courses", (req, res) => {
  //   const course = { ...req.body,
  //     _id: new Date().getTime().toString() };
  //   db.courses.push(course);
  //   res.send(course);
  // });

  const createCourse = async (req, res) => { 
    const course = await dao.createCourse({...req.body, cid: new Date().getTime().toString()});
    res.json(course);
  };



  // app.put("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   db.courses = db.courses.map((c) =>
  //     c._id === id ? { ...c, ...req.body } : c
  //   );
  //   res.sendStatus(204);
  // });

  const updateCourse = async (req, res) => {
    const { id } = req.params;
    const status = await dao.updateCourse(id, req.body);
    req.session["currentCourse"] = await dao.findCourseById(id);
    res.json(status);
  };



  // app.delete("/api/courses/:id", (req, res) => {
  //   const { id } = req.params;
  //   db.courses = db.courses.filter((c)=>c._id !== id)
  //   res.sendStatus(204);
  // });


  const deleteCourse = async (req, res) => {
    const { id } = req.params;
    const status = await dao.deleteCourse(id);
    res.json(status);
  };

  
  // app.get("/api/courses", (req, res) => {
  //   const courses = db.courses;
  //   res.send(courses);
  // });

  const findAllCourses = async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  };

  
  // app.get("/api/courses/:courseID", (req, res) => {
  //   const {courseID} = req.params;
  //   const course = db.courses.find((item) => item._id == courseID);
  //   if (courseID == '-1') {
  //     res.send(initialCourse);
  //   } 
  //   else if (!course) {
  //     res.status(404)
  //       .json({ message: `Unable to find a course with ID ${id}` });
  //     return;
  //   }
  //   else {
  //     res.send(course);
  //   }
  // });


  const findCourseById = async (req, res) => {
    const {courseID} = req.params;
    console.log("hello")
    if (courseID == '-1') {
      const initialCourse = {
        cid: new Date().getTime().toString(), 
        name: "New Course", 
        number: "New Number",
        startDate: "2023-09-10", 
        endDate: "2023-12-15",
        department: "New",
        credits: 0,
        description: 'Introduction',
        image:'6.png'
      };
      res.json(initialCourse);
      return;
    } 

    const course = await dao.findCourseById({cid : courseID});
    if (!course) {
      res.status(404)
      .json({ message: `Unable to find a course with ID ${courseID}` });
      return;
    } else {
      res.json(course);
    }
  };

  app.post("/api/courses", createCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:courseID", findCourseById);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourse);
}
