import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Diagnosis, Patient } from "../types";
import { Typography, Box } from "@mui/material";
import type {Entry, OccupationalHealthcare, HealthCheckEntry} from '../types'

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const[diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Patient>(
          `http://localhost:3001/api/patients/${id}`
        );
        setPatient(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get<Diagnosis>(
          `http://localhost:3001/api/diagnoses/`
        );
        if(!data) throw new Error('Data not found')
        setDiagnosis(diagnosis.concat(data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) return <p>Loading...</p>;
  if (!diagnosis) return <p>Loading...</p>;

  const renderHospital = (entry: Entry) =>{
    return(
        <div key={entry.id}>
            <p>{entry.date} <i>{entry.description}</i></p>
            <ul>
                {entry.diagnosisCodes?.map(code =>{
                    const diagnose = diagnosis.find(d => d.code === code);
                    return (
                        <li key={code}>
                        {code} {diagnose ? `- ${diagnose.name}` : ''}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
  }

  const renderOccupationalHealthcare = (entry: OccupationalHealthcare)=>{
    return(
        <div key={entry.id}>
            <h2>{entry.specialist}</h2>
            <h3>{entry.employerName}</h3>
            <p>{entry.date} <i>{entry.description}</i></p>
            <ul>
                {entry.diagnosisCodes?.map(code =>{
                    const diagnose = diagnosis.find(d => d.code === code);
                    return (
                        <li key={code}>
                        {code} {diagnose ? `- ${diagnose.name}` : ''}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
  }

  const renderHealthCheck = (entry: HealthCheckEntry) =>{
    return(
        <div key={entry.id}>
            <h2>{entry.specialist}</h2>
            <p>{entry.date} <i>{entry.description}</i></p>
            <p>rating: <b>{entry.healthCheckRating}</b></p>
        </div>
    )
  }

  const assertNever = (entry: never)=>{
    throw new Error(`Invalid type ${entry}`)
  }

  const renderEntry = (entry: Entry)=>{
        switch (entry.type) {
            case 'Hospital':
                return renderHospital(entry)
            
            case 'OccupationalHealthcare':
                return renderOccupationalHealthcare(entry as OccupationalHealthcare)
            
            case 'HealthCheck':
                return renderHealthCheck(entry as HealthCheckEntry)
            default:
                return assertNever(entry as never)
        }
  }

  return (
    <Box>
      <Typography variant="h4">{patient.name}</Typography>
      <p>Gender: {patient.gender}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      <p>SSN: {patient.ssn}</p>
      <h2>entries</h2>
      {patient.entries.map(entry => renderEntry(entry))}
    </Box>
  );
};

export default PatientDetailsPage;