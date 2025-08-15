import { newEntrySchema } from './../validations/patientValidations';
import {z} from 'zod';
export interface IDiagnose{
    code: string,
    name: string,
    latin?: string
}

export enum Gender{
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface IPatients{
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
}

export type PatientWithoutSSN = Omit<IPatients, 'ssn'>;
export type NewPatient = z.infer<typeof newEntrySchema>;