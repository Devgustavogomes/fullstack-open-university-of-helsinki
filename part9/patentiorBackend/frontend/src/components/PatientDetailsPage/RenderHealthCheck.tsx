import type { HealthCheckEntry } from "../../types"
import FavoriteIcon from '@mui/icons-material/Favorite';

export const RenderHealthCheck = ({entry}: {entry: HealthCheckEntry}) =>{
    const renderCheck = (health: number) =>{
        switch (health) {
            case 0:
                return <FavoriteIcon sx={{color: 'green'}}/>

            case 1:
                return <FavoriteIcon sx={{color: 'yellow'}}/>
            
            case 2:
                return <FavoriteIcon sx={{color: 'orange'}}/>
            
            case 3:
                return <FavoriteIcon sx={{color: 'red'}}/>
        
            default:
                break;
        }
    }

    return(
        <div key={entry.id}
        style={{ border: "1px solid gray",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "10px"}}
        >
            <h2>{entry.specialist}</h2>
            <p>{entry.date}</p>
            <i>{entry.description}</i>
            <p>Health: {renderCheck(entry.healthCheckRating)}</p>
        </div>
    )
  }