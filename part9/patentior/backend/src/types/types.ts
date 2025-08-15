export interface IDiagnose{
    code: string,
    name: string,
    latin?: string
}

type gender = 'male' | 'female' | 'other';

export interface IPatients{
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: gender,
    occupation: string,
}

export type PatientWithoutSSN = Omit<IPatients, 'ssn'>;