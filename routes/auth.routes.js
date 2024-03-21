import express from "express";
import { login, signup } from "../controllers/auth.controller.js";
import {ObjectId} from 'mongodb'

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
      strongSubject,
      university,
      course,
      branch,
    } = req.body;
    // console.log(req.body)
    
    // strongSubjectId is required, Do DB call later, for now hardcode
    // const temp = await searchSubject({strongSubject})
    // console.log("\n\ntemp: ", temp, "\n\n")

    let strongSubjectId = '';
    if (strongSubject == "CN"){
      strongSubjectId = new ObjectId('65fa5b844ca41e5cbaa442e8')

    } else if (strongSubject == "HPC"){
      strongSubjectId = new ObjectId('65fa5c464ca41e5cbaa442ea')

    } else if (strongSubject == "OS"){
      strongSubjectId = new ObjectId('65fa5cba4ca41e5cbaa442eb')
      
    }

    //

    const data = await signup({
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
      strongSubject,
      strongSubjectId,
      university,
      course,
      branch,
    });
    console.log("Data: ", data)

    if (!data.token) {
      return res.status(401).send(data);
    }

    res.status(201).send(data);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await login(email, password);

    if (!data.token) {
      return res.status(401).send(data);
    }

    res.status(200).send(data);
  } catch (error) {
    console.log({ error });
    res.status(500).send({ message: error.message });
  }
});

export default router;
