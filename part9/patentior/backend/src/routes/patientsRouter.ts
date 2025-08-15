import express from "express";
import {z} from 'zod';
import type { NextFunction, Request, Response } from "express";
import type { IPatients, NewPatient, PatientWithoutSSN } from "../types/types";
import { newEntrySchema } from '../validations/patientValidations';
import { getPatientsWithoutsSSN } from "../services/patientsServices";
import { v4 as uuid} from 'uuid';
const patientsRouter = express.Router();

patientsRouter.get('/', (req: Request,res: Response<PatientWithoutSSN[]>)=>{
    const patients = getPatientsWithoutsSSN();
    res.status(200).json(patients);
});

const newPatientParse = (req: Request, res: Response, next: NextFunction) =>{
    newEntrySchema.parse(req.body);
    next();
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

patientsRouter.post('/', newPatientParse, (req: Request<unknown,unknown,NewPatient>, res: Response<IPatients>) =>{
    const data = req.body;
    const newPatient = {
        id: uuid(),
        ...data
    };
    return res.status(201).json(newPatient);  
});

patientsRouter.use(errorMiddleware);

export default patientsRouter;