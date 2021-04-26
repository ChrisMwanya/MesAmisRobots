const Card = (props) => {
    return(
        <div className="card">
            <div className="centered container-img">
                <img src={props.url} alt = {props.alt} className="img" />
            </div>
            <h3  className="centered">{props.name}</h3>
            <p  className="centered">{props.email}</p>
        </div>
    )
}

export default Card;