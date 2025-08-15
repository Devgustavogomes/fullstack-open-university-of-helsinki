import express from "express";
import type { Request, Response } from "express";
import type { PatientWithoutSSN } from "../types/types";
import { getPatientsWithoutsSSN } from "../services/patientsServices";
const patientsRouter = express.Router();

patientsRouter.get('/', (req: Request,res: Response<PatientWithoutSSN[]>)=>{
    const patients = getPatientsWithoutsSSN();
    res.status(200).json(patients);
});

export default patientsRouter;