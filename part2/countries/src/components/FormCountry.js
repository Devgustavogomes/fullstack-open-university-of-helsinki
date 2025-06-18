const FormCountry = ({inputCountry}) => {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            find countries: <input onChange={inputCountry} />
        </form>
    )
}

export default FormCountry