import express from 'express';
import type { Request, Response } from 'express';
import { getDiagnose } from '../services/diagnosesService';


const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (req: Request, res: Response)=>{
    const diagnoses = getDiagnose();
    res.status(200).json(diagnoses);
});

export default diagnosesRouter;