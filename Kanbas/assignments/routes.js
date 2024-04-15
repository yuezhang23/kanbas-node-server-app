import db from "../Database/index.js";


export default function AssignmentsRoutes(app) {
    const initItem = {
    name: "New Assigment",
    aid: new Date().getTime().toString(), 
    catalog: [
      { id: "-1", 
       title: "New Title", 
       course: "New",
       description: "New Assignment Description" }]
    };

    app.get("/api/assignments", (req, res) => {
      const hws = db.assignments;
      res.send(hws);
    });
    

    // solved :error when not deleting newly added assginment but not with old ones.
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.map((m) =>  m.catalog.length > 0 ? {...m, catalog : m.catalog.filter((i) => i
          .course === cid)} : {}).filter((m) => Object.keys(m).length > 0 && m.catalog.length > 0);   

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
          const assms = db.assignments.filter((m)=> m.aid === aID)[0];
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
        const assms = db.assignments.filter((m)=> m.aid === aID)[0];
        const assignment =  {...assms, catalog : assms.catalog.filter((i) => i.id === asID)}; 
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
        db.assignments = db.assignments.map((m) => m.aid == aID ? {...m, catalog : m.catalog.filter((i) => i.course !== cid)} : m); 
        res.sendStatus(204);
      });
      

      app.delete("/api/courses/:cid/assignments/:aid/:sid", (req, res) => {
        const cid = req.params.cid;
        const aID = req.params.aid;
        const asID = req.params.sid;
        db.assignments = db.assignments.map((m) => m.aid == aID ? {...m, catalog : m.catalog.filter((i) => i.id != asID)} : m) 
        const assignment = db.assignments.find((m) => m.aid === aID);
        const cat = assignment.catalog.filter((i) => i.course === cid);
        res.send({...assignment, catalog : cat});
      });   
           
      app.post("/api/courses/:cid/assignments", (req, res) => {
        const cat = {...req.body.catalog[0],  aid : new Date().getTime().toString()};
        const newHW = { 
          ...req.body,
          id: new Date().getTime().toString() + "01",
          catalog : [cat]
        };
        db.assignments.push(newHW);
        res.send(newHW);
      });
      

      app.put("/api/courses/:cid/assignments/:aid/:sid", (req, res) => {
        const aID  = req.params.aid;
        const asID  = req.params.sid;
        const cat = req.body.catalog[0];

        db.assignments = db.assignments.map((m) => m.aid == aID ? 
          {...m, catalog : m.catalog.map((i) => i.id === asID? cat : i) } : m) 

        res.sendStatus(204);
      });    
      
};