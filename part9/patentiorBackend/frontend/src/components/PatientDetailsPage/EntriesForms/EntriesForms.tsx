import HospitalForm from "./HospitalForm"
import type { Diagnosis, Entry } from "../../../types";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HealthCheckForm from "./HealthCheckForm";

type EntryType = "None" | "Hospital" | "OccupationalHealthcare" | "HealthCheck";

interface Props{
   type: EntryType,
   id:  string | undefined,
   addEntryToPatient:(entry: Entry) => void,
   error: (error: string) => void,
   diagnosis: Diagnosis[] | undefined
}

export default function EntriesForms({type, id, addEntryToPatient, diagnosis, error}: Props){
    const assertNever = (entry: never)=>{
        throw new Error(`Invalid type ${entry}`)
    }
    const renderForm = (type: EntryType) =>{
        switch (type) {
                case 'None':
                    return null
                case 'Hospital':
                    return <HospitalForm id={id} addEntryToPatient={addEntryToPatient} diagnosis={diagnosis} Error={error}/>
                    
                case 'OccupationalHealthcare':
                    return <OccupationalHealthcareForm id={id} addEntryToPatient={addEntryToPatient} diagnosis={diagnosis} Error={error}/>
                    
                case 'HealthCheck':
                    return <HealthCheckForm id={id} addEntryToPatient={addEntryToPatient} diagnosis={diagnosis} Error={error}/>
                default:
                    return assertNever(type)
            }
    }
    return(
        <div>
            {renderForm(type)}
        </div>
    )
}