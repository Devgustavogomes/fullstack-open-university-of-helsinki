import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Diagnosis, Patient } from "../../types";
import { Typography, Box } from "@mui/material";
import type {Entry} from '../../types'
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { RenderHospital } from "./RenderHospital";
import { RenderOccupationalHealthcare } from "./RenderOccupationalHealthcare";
import { RenderHealthCheck } from "./RenderHealthCheck";
import ErrorMessage from "../ErrorMessage";
import EntriesForms from "./EntriesForms/EntriesForms";

type EntryType = "None" | "Hospital" | "OccupationalHealthcare" | "HealthCheck";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [typeEntry, setTypeEntry] = useState<EntryType>('None');
  const [error, setError] = useState('')

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

  const addEntryToPatient = (entry: Entry) => {
    if (!patient) return;
    setPatient({
      ...patient,
      entries: [...patient.entries, entry],
    });
  };

  const handlerError = (error: string) =>{
    setError(error)
    setTimeout(() => {
      setError('')
    }, 5000);
  }


  const assertNever = (entry: never)=>{
    throw new Error(`Invalid type ${entry}`)
  }

  const renderEntry = (entry: Entry)=>{
        switch (entry.type) {
            case 'Hospital':
                return <RenderHospital entry={entry} diagnosis={diagnosis}/>
            
            case 'OccupationalHealthcare':
                return <RenderOccupationalHealthcare entry={entry} diagnosis={diagnosis}/>
            
            case 'HealthCheck':
                return <RenderHealthCheck entry={entry}/>
            default:
                return assertNever(entry)
        }
  }

  return (
    <Box>
      <Typography variant="h4">{patient.name} {patient.gender === 'male' ? <MaleIcon/> : <FemaleIcon/>}</Typography>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      <p>SSN: {patient.ssn}</p>
      <h4>New entry:</h4>
      <select name="" id="" onChange={(e) => setTypeEntry(e.target.value as EntryType)}>
          <option value="None">None</option>
          <option value="Hospital">Hospital</option>
          <option value="OccupationalHealthcare">Occupational Healthcare</option>
          <option value="HealthCheck">HealthCheck</option>
      </select>
      {error === '' ? '' : <ErrorMessage error={error}/>}
      <EntriesForms type={typeEntry} id={id} addEntryToPatient={addEntryToPatient} diagnosis={diagnosis} error={handlerError}/>
      <h2>entries</h2>
      {patient.entries.map(entry => 
      <div key={entry.id}>
          {renderEntry(entry)}
      </div>)}
    </Box>
  );
};

export default PatientDetailsPage;