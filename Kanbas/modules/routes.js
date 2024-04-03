import db from "../Database/index.js";
export default function ModuleRoutes(app) {

  const initialModule = 
  {
    _id: "-1",
    name: "New Name",
    description: "Intro",
    course: '-1',
    lessons: [
      {
        _id: "-1",
        lname: "New Lesson Name",
        description: ["Intro"],
        module: "-1"
      }]
  };


  app.post("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const newModule = { ...req.body,
      course: cid,
      _id: new Date().getTime().toString() };
    db.modules.push(newModule);
    res.send(newModule);
  });


  app.put("/api/courses/:cid/modules/:mid", (req, res) => {
    const mID  = req.params.mid;
    db.modules = db.modules.map((c) =>
      c._id === mID ? { ...c, ...req.body } : c
    );
    res.sendStatus(204);
  });


  app.delete("/api/courses/:cid/modules/:mid", (req, res) => {
    const mID = req.params.mid;
    db.modules = db.modules.filter((c)=>c._id !== mID)
    res.sendStatus(204);
  });
  

  app.get("/api/modules", (req, res) => {
    const modules = db.modules;
    res.send(modules);
  });


  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const modules = db.modules
      .filter((m) => m.course === cid);
    if (!modules) {
      res.status(404)
      .json({ message: `Unable to find a course with ID ${id}` });
    return;
    } else {
      res.send(modules);
    }
  });


  app.get("/api/courses/:courseID/modules/:moduleID", (req, res) => {
    const cID = req.params.courseID;
    const mID = req.params.moduleID;
  
    const module  = db.modules.find((item) => item._id == mID && item.course == cID);
    if (mID == '-1') {
      initialModule.course = cID;
      res.send(initialModule);
    } 
    else if (!module) {
      res.status(404)
        .json({ message: `Unable to find a course with ID ${id}` });
      return;
    }
    else {
      res.send(module);
    }
  });

}
