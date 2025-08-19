export default function ErrorMessage({error}: {error: string}){
    return(
        <p style={{color: 'red'}}>
            {error}
        </p>
    )
}