import { useState } from "react";

const Card = (props) => {
	const [moreInfoIsVisibe, setMoreInfoIsVisibe] = useState(false);

	const handleClickShowMoreInfo = () => {
		setMoreInfoIsVisibe(!moreInfoIsVisibe);
	};

	const handleBlur = () => {
		setMoreInfoIsVisibe(false);
	};
	console.log(moreInfoIsVisibe);
	return (
		<div className="card" onClick={handleClickShowMoreInfo} onBlur={handleBlur}>
			{moreInfoIsVisibe ? (
				<div className="More-info">
					<h3>More information</h3>
					<p>
						<span>username : </span>{props.friend.username}
					</p>
					<p>
						<span>Adress :</span>
							{`						
								${props.friend.address.street},
								${props.friend.address.suite},
								${props.friend.address.suite}`}
						
					</p>
					<p>
						<span>phone : </span> {props.friend.phone}
					</p>
					<p>
						<span>website : </span> {props.friend.website}
					</p>
					<p>
						<span>company :</span> {props.friend.company.name}
					</p>
				</div>
			) : (
				<div className="less-info">
					<div className="centered container-img">
						<img src={props.url} alt={props.alt} className="img" />
					</div>
					<h3 className="centered">{props.name}</h3>
					<p className="centered">{props.email}</p>
				</div>
			)}
		</div>
	);
};

export default Card;
