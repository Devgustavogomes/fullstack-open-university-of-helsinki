const ConfirmMessage = ({confirmMessage}) =>{
    if(confirmMessage === null) return null
    return(
        <div className="confirm">
            {confirmMessage}
        </div>
    )
}

export default ConfirmMessage