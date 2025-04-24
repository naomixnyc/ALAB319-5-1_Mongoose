import express from "express"
import Fruit from "../models/fruit.mjs"

const router = express.Router()

// INDUCES

// GET all fruits- Index
router.get('/', async (req, res)=>{
    try{
        const fruits = await Fruit.find()
        res.json(fruits)
    }catch (err) {
        console.log(err)
    }
    
})

// New - to be handled by our front end 

// Delete - Delete one fruit by Id
router.delete('/:id', async (req, res)=>{
    try {
        await Fruit.findByIdAndDelete(req.params.id)
        res.redirect('/fruits')//redirect back to fruits index
    } catch(error) {
        console.error(error)
      }
    })

// Update - Update an existing fruit by id
router.put("/:id", async (req, res) => {
    try {
      if (req.body.readyToEat === "on") {
        //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
      } else {
        //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
      }
      // fruits.push(req.body);
      await Fruit.findByIdAndUpdate(req.params.id, req.body)
  
      res.redirect("/fruits")
    } catch (error) {
      console.log(error)
    }
  });

// Create - POST Create a new fruit 
router.post('/', async (req, res) => {
    try {
        if (req.body.readyToEat === "on") {
          //if checked, req.body.readyToEat is set to 'on'
          req.body.readyToEat = true //do some data correction
        } else {
          //if not checked, req.body.readyToEat is undefined
          req.body.readyToEat = false //do some data correction
        }
         await Fruit.create(req.body)
    
        res.redirect("/fruits")
    
      } catch(error) {
        console.log(error)
      }
})

// Edit - to be handled by Frunt end


//Show - GET one fruit by its ID
router.get('/:id', async (req, res) =>{
    try{
        const fruit = await Fruit.findById(req.params.id)
        res.json(fruit)
    } catch(err) {
        console.log(err)
    }
})

export default router


























// From the last lab: https://codesandbox.io/p/devbox/mongodb-building-an-api-6-r79yvf

// import express from "express";
// import mongoose from "mongoose";
// const router = express.Router();

// // Create a single grade entry
// router.post("/", async (req, res) => {
//   let collection = await db.collection("fruit");
//   let newDocument = req.body;

// //   // rename fields for backwards compatibility
// //   if (newDocument.student_id) {
// //     newDocument.learner_id = newDocument.student_id;
// //     delete newDocument.student_id;
// //   }

//   let result = await collection.insertOne(newDocument);
//   res.send(result).status(204);
// });

// // Get a single grade entry
// router.get("/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { _id: new ObjectId(req.params.id) };
//   let result = await collection.findOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Add a score to a grade entry
// router.patch("/:id/add", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { _id: new ObjectId(req.params.id) };

//   let result = await collection.updateOne(query, {
//     $push: { scores: req.body },
//   });

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Remove a score from a grade entry
// router.patch("/:id/remove", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { _id: new ObjectId(req.params.id) };

//   let result = await collection.updateOne(query, {
//     $pull: { scores: req.body },
//   });

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Delete a single grade entry
// router.delete("/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { _id: new ObjectId(req.params.id) };
//   let result = await collection.deleteOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Get route for backwards compatibility
// router.get("/student/:id", async (req, res) => {
//   res.redirect(`learner/${req.params.id}`);
// });

// // Get a learner's grade data
// router.get("/learner/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { learner_id: Number(req.params.id) };

//   // Check for class_id parameter
//   if (req.query.class) query.class_id = Number(req.query.class);

//   let result = await collection.find(query).toArray();

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Delete a learner's grade data
// router.delete("/learner/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { learner_id: Number(req.params.id) };

//   let result = await collection.deleteOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Get a class's grade data
// router.get("/class/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { class_id: Number(req.params.id) };

//   // Check for learner_id parameter
//   if (req.query.learner) query.learner_id = Number(req.query.learner);

//   let result = await collection.find(query).toArray();

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Update a class id
// router.patch("/class/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { class_id: Number(req.params.id) };

//   let result = await collection.updateMany(query, {
//     $set: { class_id: req.body.class_id },
//   });

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Delete a class
// router.delete("/class/:id", async (req, res) => {
//   let collection = await db.collection("grades");
//   let query = { class_id: Number(req.params.id) };

//   let result = await collection.deleteMany(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// export default router;
