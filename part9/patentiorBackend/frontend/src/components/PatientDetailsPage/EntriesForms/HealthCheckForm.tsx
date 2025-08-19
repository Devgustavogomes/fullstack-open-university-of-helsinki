import { useState } from "react";
import type { Entry, Diagnosis } from "../../../types";
import { HealthCheckRating } from "../../../types";
import axios from "axios";
interface Props {
  id: string | undefined,
  addEntryToPatient: (entry: Entry) => void,
  diagnosis: Diagnosis[] | undefined, 
  Error: (error: string) => void,
}


export default function HealthCheckForm({ id, addEntryToPatient, diagnosis, Error }: Props){
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [diagnosi, setDiagnosi] = useState<string[]>([]);
    const [healthCheck, setHealthCheck] = useState<HealthCheckRating>()


    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
        setDiagnosi(selectedValues);
    }

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const newEntry = {
          description,
          date,
          specialist,
          diagnosisCodes: diagnosi, 
          healthCheckRating: healthCheck,
          type: 'HealthCheck'
        }
        try {
            const { data } = await axios.post<Entry>(`http://localhost:3001/api/patients/${id}/entries`, newEntry);
            addEntryToPatient(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
              const backendError = error.response?.data;

              const message = backendError?.error
                ?.map((issue: any) => `${issue.path.join('.')} - ${issue.message}`)
                .join(', ');

              Error(message)
            }
        }
      }
    
    return(
        <form
      onSubmit={onSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        border: '1px dashed #333',
        padding: '12px',
        borderRadius: '4px',
        maxWidth: '400px'
      }}
    >
      <input type="text" placeholder="description" onChange={({ target }) => setDescription(target.value)} />
      <label>
        Date: <input type="date" onChange={({ target }) => setDate(target.value)} />
      </label>
      <input type="text" placeholder="specialist" onChange={({ target }) => setSpecialist(target.value)} />
      <select multiple onChange={handleSelectChange}>
        {diagnosis?.map(d => (
          <option key={d.code} value={d.code}>({d.code})</option>
        ))}
      </select>
      <label htmlFor="">
        Health Rating:
        <input type="radio" name="health" value="0" onChange={({target}) => setHealthCheck(Number(target.value))}/> Healthy
        <input type="radio" name="health" value="1" onChange={({target}) => setHealthCheck(Number(target.value))}/> Low risk
        <input type="radio" name="health" value="2" onChange={({target}) => setHealthCheck(Number(target.value))}/> High risk
        <input type="radio" name="health" value="3" onChange={({target}) => setHealthCheck(Number(target.value))}/> Critical Risk
      </label>
      <button type="submit">Send</button>
    </form>
    )
}