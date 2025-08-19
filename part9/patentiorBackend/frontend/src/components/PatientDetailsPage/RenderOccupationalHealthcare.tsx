import type { Diagnosis, OccupationalHealthcare } from "../../types";


interface Props{
    entry: OccupationalHealthcare,
    diagnosis: Diagnosis[]
}

export const RenderOccupationalHealthcare = ({entry, diagnosis}: Props)=>{
    return(
        <div key={entry.id}
        style={{ border: "1px solid gray",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "10px"}}
        >
            <h3>{entry.employerName}</h3>
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
                sickleave: {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
            </p>
            <p>diagnose by {entry.specialist}</p>
        </div>
    )
  }