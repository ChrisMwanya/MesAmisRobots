import React, { useState, useEffect } from "react";
import Card from "./components/card";
import InputField from "./components/inputfield";
import "./App.css"
import Loading from "./components/loading";

const App = () => {
	let [friends, setFriends] = useState([]);
	let [load, setLoad]= useState(false)

    let [friendsTampon, setFriendsTampon] = useState(friends);
	useEffect(() => {
		setLoad(true)
		fetch("http://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((data) => {
				let dataMapped = data.map(({ id, name, email }) => {
					return { id, name, email };
				});
				setFriends(dataMapped);
                setFriendsTampon(dataMapped);
				setLoad(false);
			});
	}, []);

	
	const handleChange = (e) => {
		e.preventDefault();
		const filteredFriends = friends.filter((friend) => {
			return friend.name.toLowerCase().includes(e.target.value.toLowerCase());
		});
		setFriendsTampon((friendsTampon = filteredFriends));
	};

	return (
		
		
		<div className="App">
			{load ? <Loading /> :
			<>
				<h1>MES AMIS ROBOTS</h1>
				<InputField onChange={handleChange} />
				<div className="bloc-cards">
					{friendsTampon.map((friend, index) => {
						return (
							<Card
								key={index}
								name={friend.name}
								email={friend.email}
								url={`https://robohash.org/${friend.id}`}
							/>
						);
					})}
				</div>
				</>}
		
		</div>
	);
};
export default App;
