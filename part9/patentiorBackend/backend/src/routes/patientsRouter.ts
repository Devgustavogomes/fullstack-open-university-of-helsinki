import express from "express";
import {z} from 'zod';
import type { NextFunction, Request, Response } from "express";
import type { IPatients, NewPatient, PatientWithoutSSN } from "../types/types";
import { newEntrySchema } from '../validations/patientValidations';
import { getPatientsWithoutsSSN, getPatientById } from "../services/patientsServices";
import { v4 as uuid} from 'uuid';
import patients from "../data/patients";
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

patientsRouter.get('/:id', (req: Request,res: Response)=>{
    const {id} = req.params;
    if(!id){
      return res.status(404).json({error: 'Id not found'});
    }
    const patients = getPatientById(id);
    if(!patients){
      return res.status(404).json({error: 'Patients not found'});
    }
    const returnPatient = {
      ...patients
    };
    return res.status(200).json(returnPatient);
});


patientsRouter.post('/', newPatientParse, (req: Request<unknown,unknown,NewPatient>, res: Response<IPatients | {error: string}>) =>{
    const result = newEntrySchema.safeParse(req.body);
    if(!result.success){
      return res.status(400).json({error: 'Invalid Input'});
    }
    const newPatient = {
        id: uuid(),
        ...result.data,
        entries: []
    };
    patients.concat(newPatient);
    return res.status(201).json(newPatient);  
});

patientsRouter.use(errorMiddleware);

export default patientsRouter;