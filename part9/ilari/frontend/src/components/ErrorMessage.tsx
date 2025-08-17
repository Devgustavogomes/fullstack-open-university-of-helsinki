export default function ErrorMessage({error}: {error: string}){
    return(
        <div>
            <p style={{color: 'red'}}>{error}</p>
        </div>
    )
}