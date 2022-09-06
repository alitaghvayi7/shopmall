import "./forminput.scss"

const FormInput = ({label,setError,errorMessage,id,...others}) => {

    return (
        <div className="group">
            <label className={`form-input-label ${others.value.length ? 'shrink' : ''}`}>{label}</label>
            <input className="form-input" id={id} {...others}/>
            {setError && <span className="error-messages">{errorMessage}</span>}
        </div>
    )
}

export default FormInput;