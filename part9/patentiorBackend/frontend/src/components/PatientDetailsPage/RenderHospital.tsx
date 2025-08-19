import type { Diagnosis, Hospital } from "../../types";


interface Props{
    entry: Hospital,
    diagnosis: Diagnosis[]
}

export const RenderHospital = ({entry, diagnosis}: Props) =>{
    return(
        <div key={entry.id} 
        style={{ border: "1px solid gray",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "10px"}}>
            <p>{entry.date}</p>
            <i>{entry.description}</i>
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
            <p>
                discharge date: {entry.discharge?.date}
            </p>
            <p>
                discharge criteria: {entry.discharge?.criteria}
            </p>
            <p>diagnose by: {entry.specialist}</p>
        </div>
    )
  }