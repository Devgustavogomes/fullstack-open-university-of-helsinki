import type { Request, Response } from './node_modules/@types/express-serve-static-core/index.d';
import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import { calculateExercises } from './exerciseCalculator';
const app = express();

interface ExerciseRequestBody{
  daily_exercises: number[];
  target: number;
}
app.use(express.json());
app.get('/', (_req, res) => {
  res.status(200).json({message: 'Hello Full Stack!'});
});

app.get('/bmi', (req: Request, res: Response) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if(!height || !weight){
        res.status(400).json({ error: "malformatted parameters"});
    }
    const bmi = bmiCalculator(weight,height);
    const result = {
        weight,
        height,
        bmi
    };
    res.status(200).json(result);
}); 

app.post('/exercises', (req: Request<object,unknown, ExerciseRequestBody>, res: Response) =>{
    const {daily_exercises , target} = req.body;

    if(!daily_exercises || !target || isNaN(Number(target))) return res.status(400).json({error: "parameters missing"});

    const result = calculateExercises(target,daily_exercises);

    return res.status(200).json(result);
});

app.listen(3003, ()=>{
    console.log(`Running on port 3003`);
});