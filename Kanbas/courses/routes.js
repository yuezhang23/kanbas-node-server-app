import db from "../Database/index.js";

export default function CourseRoutes(app) {
  const initialCourse = {
    _id: "-1", 
    name: "New Course", 
    number: "New Number",
    startDate: "2023-09-10", 
    endDate: "2023-12-15",
    department: "New",
    credits: 0,
    description: 'Introduction',
    image: 'init.png'
  };


  app.post("/api/courses", (req, res) => {
    const course = { ...req.body,
      _id: new Date().getTime().toString() };
    db.courses.push(course);
    res.send(course);
  });

  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    db.courses = db.courses.map((c) =>
      c._id === id ? { ...c, ...req.body } : c
    );
    res.sendStatus(204);
  });

  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    db.courses = db.courses.filter((c)=>c._id !== id)
    res.sendStatus(204);
  });


  app.get("/api/courses", (req, res) => {
    const courses = db.courses;
    res.send(courses);
  });

  
  app.get("/api/courses/:courseID", (req, res) => {
    const {courseID} = req.params;
    const course = db.courses.find((item) => item._id == courseID);
    if (courseID == '-1') {
      res.send(initialCourse);
    } 
    else if (!course) {
      res.status(404)
        .json({ message: `Unable to find a course with ID ${id}` });
      return;
    }
    else {
      res.send(course);
    }
  });
}

