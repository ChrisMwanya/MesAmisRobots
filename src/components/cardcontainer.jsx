import React, { useState, useEffect } from "react";
import Card from "./card";
import InputField from "./inputfield";
import "./../App.css";
import Loading from "./loading";


const CardContainer = () => {
    let [friends, setFriends] = useState([]);	
	let [load, setLoad] = useState(false);   
	let [friendsBuffer, setFriendsBuffer] = useState(friends);

    useEffect(() => {
    
        setLoad(true);
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => {
               
    
                let dataMoreMapped = data.map(
                    ({ id, name, email, username, address, phone, website, company }) => {
                        return {
                            id,
                            name,
                            email,
                            username,
                            address,
                            phone,
                            website,
                            company,
                        };
                    }
                );
                setFriends(dataMoreMapped);
                setFriendsBuffer(dataMoreMapped);               
                setLoad(false);
            });
    }, []);

    const handleChange = (e) => {
		e.preventDefault();
		const filteredFriends = friends.filter((friend) => {
			return friend.name.toLowerCase().includes(e.target.value.toLowerCase());
		});
		setFriendsBuffer((friendsBuffer = filteredFriends));
	};

    return (
		<div className="App">
			{load ? (
				<Loading />
			) : (
				<>
					<h1 className="bloc-cards">
						<div className="centered">MES</div>
						<div className="centered">AMIS</div>
						<div className="centered">ROBOTS</div>
					</h1>
					<InputField onChange={handleChange} />
					<div className="bloc-cards">
						{friendsBuffer.map((friend, index) => {
							return (
								<Card									
									key={index}
									name={friend.name}
									email={friend.email}
									friend={friend}
									url={`https://robohash.org/${friend.id}`}
								/>
							);
						})}
					</div>				
				</>
			)}
		</div>
	);
}

export default CardContainer

