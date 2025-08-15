import { Gender } from './../../../frontend/src/types';
import patients from '../data/patients';
import type { PatientWithoutSSN } from '../types/types';


export const getPatients = (): PatientWithoutSSN[]=>{
    return patients as PatientWithoutSSN[];
};

export const getPatientsWithoutsSSN= ():PatientWithoutSSN[]=>{
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: gender as Gender,
    occupation
  }));
};

