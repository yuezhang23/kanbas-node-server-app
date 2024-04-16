// import db from "../Database/index.js";
import * as dao from "./dao.js";

export default function ModuleRoutes(app) {

// app.post("", (req, res) => {
//   const { cid } = req.params;
//   const newModule = { ...req.body,
//     course: cid,
//     _id: new Date().getTime().toString() };
//   db.modules.push(newModule);
//   res.send(newModule);
// });

const createModule = async (req, res) => { 
  const { cid } = req.params;
  const { _id, ...copiedObject } = req.body;
  const newModule = { ...copiedObject,
    course: cid, 
    mid: new Date().getTime().toString()
};
  const module = await dao.createModule(newModule);
  res.json(module);
};


//   app.put("", (req, res) => {
//     const mID  = req.params.mid;
//     db.modules = db.modules.map((c) =>
//     c._id === mID ? { ...c, ...req.body } : c
//   );
//   res.sendStatus(204);
// });

const updateModule = async (req, res) => {
  const mID  = req.params.mid;
  const status = await dao.updateModule(mID, req.body);
  req.session["currentModule"] = await dao.findModuleById(mID);
  res.json(status);
};


// app.delete("", (req, res) => {
//   const mID = req.params.mid;
//   db.modules = db.modules.filter((c)=>c._id !== mID)
//   res.sendStatus(204);
// });

const deleteModule = async (req, res) => {
  const mID = req.params.mid;
  const status = await dao.deleteModule(mID);
  res.json(status);
};

// app.get("", (req, res) => {
//   const modules = db.modules;
//   res.send(modules);
// });

const findAllModules = async (req, res) => {
  const modules = await dao.findAllModules();
  res.json(modules);
};

// app.get("", (req, res) => {
//   const { cid } = req.params;
//   const modules = db.modules
//     .filter((m) => m.course === cid);
//   if (!modules) {
//     res.status(404)
//     .json({ message: `Unable to find a course with ID ${id}` });
//   return;
//   } else {
//     res.send(modules);
//   }
// });

const findModulesByCourse = async (req, res) => {
  const { cid } = req.params;
  const modules = await dao.findModulesByCourse(cid);
  if (!modules) {
    res.status(404)
    .json({ message: `Unable to find modules within a course ID ${cid}` });
    return;
  } else {
    res.json(modules);
  }
};
                  

// app.get("", (req, res) => {
//   const cID = req.params.courseID;
//   const mID = req.params.moduleID;

//   const module  = db.modules.find((item) => item._id == mID && item.course == cID);
//   if (mID == '-1') {
//     initialModule.course = cID;
//     res.send(initialModule);
//   } 
//   else if (!module) {
//     res.status(404)
//       .json({ message: `Unable to find a course with ID ${id}` });
//     return;
//   }
//   else {
  //     res.send(module);
  //   }
  // });
  
  
  const findModuleById = async (req, res) => { 
    const cID = req.params.courseID;
    const mID = req.params.moduleID;
    
    if (mID === '-1') {
      const initialModule = 
      {
        mid: new Date().getTime().toString(),
        name: "New Name",
        description: "Intro",
        course: '-1',
        lessons: [
          {
          lid: "-1",
          lname: "New Lesson Name",
          description: ["Intro"],
          module: "-1"
          }]
      };
      res.json(initialModule);
      return;
    } 
    
    const module = await dao.findModuleByCredentials({course : cID, mid : mID});
    if (!module) {
      res.status(404)
      .json({ message: `Unable to find a module within ID ${mID}` });
      return;
    }
    else {
      res.json(module);
    }
  };


app.post("/api/courses/:cid/modules", createModule);
app.get("/api/modules", findAllModules);
app.get("/api/courses/:cid/modules", findModulesByCourse);
app.get("/api/courses/:courseID/modules/:moduleID", findModuleById);
app.put("/api/courses/:cid/modules/:mid", updateModule);
app.delete("/api/courses/:cid/modules/:mid", deleteModule);
}

                        
