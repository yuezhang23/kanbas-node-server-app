import db from "../../Database/index.js";

export default function AssignmentsRoutes(app) {
    const initItem = {
    name: "New Assigment",
    _id: "-1",
    catalog: [
      { _id: "-1", 
       title: "New Title", 
       course: "New",
       description: "New Assignment Description" }]
    };

    app.get("/api/assignments", (req, res) => {
      const hws = db.assignments;
      res.send(hws);
    });
    

    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.map((m) => m.catalog.length > 0 ? {...m, catalog : m.catalog.filter((i) => i
          .course === cid)} : {}).filter((m) => m.catalog.length > 0);   
        if (!assignments ) {
            res.status(404)
            .json({ message: `Unable to find the assignment with ID ${id}` });
            return;
        } else {
            res.send(assignments);
        }
    });
         
    app.get("/api/courses/:courseID/assignments/:aID", (req, res) => {
        const cid = req.params.courseID;
        const aID = req.params.aID;
        if (aID === '-1') {
          const cat = {...initItem.catalog[0], course : cid};
          res.send({...initItem, catalog: [cat]});
        } else {
          const assms = db.assignments.filter((m)=> m._id === aID)[0];
          const assignment =  {...assms, catalog : assms.catalog.filter((i) => i.course === cid)}; 
          if (!assignment) {
            res.status(404)
              .json({ message: `Unable to find a course with ID ${id}` });
            return;
          }
          else {
            res.send(assignment);
          }
        }
      });


      app.get("/api/courses/:courseID/assignments/:aID/:asID", (req, res) => {
        const aID = req.params.aID;
        const asID = req.params.asID;
        const assms = db.assignments.filter((m)=> m._id === aID)[0];
        const assignment =  {...assms, catalog : assms.catalog.filter((i) => i._id === asID)}; 
        if (!assignment) {
          res.status(404)
            .json({ message: `Unable to find a course with ID ${id}` });
          return;
        }
        else {
          res.send(assignment);
        }
      });


      app.delete("/api/courses/:cid/assignments/:aid", (req, res) => {
        const cid = req.params.cid;
        const aID = req.params.aid;
        db.assignments = db.assignments.map((m) => m._id == aID ? {...m, catalog : m.catalog.filter((i) => i.course !== cid)} : m); 
        res.sendStatus(204);
      });
      
      
      
      app.delete("/api/courses/:cid/assignments/:aid/:sid", (req, res) => {
        const cid = req.params.cid;
        const aID = req.params.aid;
        const asID = req.params.sid;
        db.assignments = db.assignments.map((m) => m._id == aID ? {...m, catalog : m.catalog.filter((i) => i._id != asID)} : m) 
        const assignment = db.assignments.find((m) => m._id === aID);
        const cat = assignment.catalog.filter((i) => i.course === cid);
        res.send({...assignment, catalog : cat});
      });
      
      
      app.post("/api/courses/:cid/assignments", (req, res) => {
        const cid = req.params;
        const cat =   { ...req.body.catalog[0], course : cid,  _id:  new Date().getTime().toString() };

        const newHW = { 
          ...req.body,
          _id: new Date().getTime().toString(),
          catalog : [{...cat}]
        };

        db.assignments.push(req.body);
        res.send(newHW);
      });
      

      app.put("/api/courses/:cid/assignments/:aid/:sid", (req, res) => {
        const aID  = req.params.aid;
        const asID  = req.params.sid;
        const cat = req.body.catalog[0];

        db.assignments = db.assignments.map((m) => m._id == aID ? 
          {...m, catalog : m.catalog.map((i) => i._id === asID? cat : i) } : m) 

        res.sendStatus(204);
      });    
      
};