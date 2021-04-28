import React, { useState, useEffect } from "react";
import Card from "./components/card";
import InputField from "./components/inputfield";
import "./App.css";
import Modal from "react-modal";
import Loading from "./components/loading";

Modal.setAppElement("#root");
const App = () => {
	let [friends, setFriends] = useState([]);
	let [friendsMore,setFriendsMore] = useState([]);
	let [load, setLoad] = useState(false);
	let [modalIsOpen, setModalIsOpen] = useState(false);
	let [singleFriend, setSingleFriend] = useState({});
	let [friendsTampon, setFriendsTampon] = useState(friends);

	
	useEffect(() => {
		setLoad(true);
		fetch("http://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((data) => {
				
				let dataMapped = data.map(({ id, name, email }) => {
					return { id, name, email };
				});
				setFriends(dataMapped);
				setFriendsTampon(dataMapped);
				setFriendsMore(data);
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

	const openModal = (id) => {
		setSingleFriend(
			friendsMore.find((friend) => {
				return friend.id === id;
			})
		);
		setModalIsOpen(true);
	};

	return (
		<div className="App">
			{load ? (
				<Loading />
			) : (
				<>
					<h1 className="bloc-cards">
						<div className="centered">MES</div>{" "}
						<div className="centered">AMIS</div>
						<div className="centered">ROBOTS</div>
					</h1>
					<InputField onChange={handleChange} />
					<div className="bloc-cards">
						{friendsTampon.map((friend, index) => {
							return (
								<Card
									onClick={() => openModal(friend.id)}
									key={index}
									name={friend.name}
									email={friend.email}
									url={`https://robohash.org/${friend.id}`}
								/>
							);
						})}
					</div>
					<Modal
						style={{
							overlay: {
								backgroundColor : '#0C195A',
								opacity: "O.6",
							},
							content: {
								
								
							},
						}}
						isOpen={modalIsOpen}
						onRequestClose={() => setModalIsOpen(false)}>
							<h2 className="centered">About my friend</h2>
							<hr />
						<div className="modal">
							<div >
								<img
									src={`https://robohash.org/${singleFriend.id}`}
									alt={singleFriend.name}
								/>
							</div>
							<div>
								<p className="modal-title">Name : {singleFriend.name}</p>
								<p>Username :{singleFriend.username}</p>
								<p>Email :{singleFriend.email}</p>
								<p>Tél : {singleFriend.phone}</p>
								{/* <div>Adresse 
									<p>Street : {singleFriend.address.street}</p> 
									<p>Suite : {singleFriend.address.suite}</p>
									<p>City : {singleFriend.address.city}</p>
									<p>Zipcode : {singleFriend.address.zipcode}</p>
								</div>
								<p>Company: {singleFriend.company.name}</p> */}
							</div>
						</div>
					</Modal>
				</>
			)}
		</div>
	);
};
export default App;
