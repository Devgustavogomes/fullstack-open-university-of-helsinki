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

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<IDiagnose['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface Hospital extends BaseEntry{
    type: 'Hospital',   
    discharge: {
        date: string,
        criteria: string
    }
}

interface OccupationalHealthcare extends BaseEntry{
    type: 'OccupationalHealthcare'
    employerName: string,
    sickLeave?:{
        startDate: string,
        endDate: string
    }


}
type Entry = Hospital | HealthCheckEntry | OccupationalHealthcare;

export interface IPatients{
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}

export type PatientWithoutSSN = Omit<IPatients, 'ssn' | 'entries'>;

export type NewPatient = z.infer<typeof newEntrySchema>;