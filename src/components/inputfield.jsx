const InputField = (props) => {
    return (
        <input type="text" placeholder="Rechercher par nom" onChange={props.onChange} />
    )
}

export default InputField;