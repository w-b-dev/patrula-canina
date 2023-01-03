import React, {useEffect, useState} from "react";
import "./App.css";
import {ApiResponseType} from "./interfaces";
import {SingleEntryElement} from "./SingleEntryElement";
import {getAllEntries, getUser} from "./api";


const handleAnswer = (isCorrect: boolean) => {
	alert(isCorrect ? "✅" : "❌");
}

const handleUserRegistration = (email: string, setUserRetrieved: (v: boolean) => void) => {
	if (email === "") {
		return
	}
	// make fetch call to register user
	getUser().then((data) => {
		alert(JSON.stringify(data.data[0]));
	});
	setUserRetrieved(true);
}

function App() {
	const [userEmail, setUserEmail] = useState<string>("");
	const [userRetrieved, setUserRetrieved] = useState<boolean>(false);
	const [getAPI, setGetAPI] = useState<ApiResponseType[]>([]);
	useEffect(() => {
		getAllEntries().then(data => setGetAPI(data.data)
		);
	}, []);

	return (
		<div className="App">
			<header style={{display: "flex", flexDirection: "column"}}>
				<p style={{textAlign: "center"}}>Patrulha Canina</p>
				{!userRetrieved &&
					(<><label htmlFor="email" style={{flex: 1, textAlign: "center"}}>INSIRA SEU USUARIO:</label>
						<section style={{display: "flex", padding: "1rem", maxWidth: "400px", margin: "auto"}}>
							<input type="email" style={{flex: 1}} inputMode={"email"} translate={"no"} autoFocus={true}
								   id={'email'}
								   value={userEmail}
								   onChange={v => setUserEmail(v.currentTarget.value)}
								   onKeyDown={(ev) => ev.key === 'Enter' ? handleUserRegistration(userEmail, setUserRetrieved) : null}
							/>
							<button
								onClick={() => handleUserRegistration(userEmail, setUserRetrieved)}
								disabled={userRetrieved}>OK
							</button>
						</section>
					</>)}
			</header>
			<section className={"cima"}>
				{getAPI.length > 0 && <SingleEntryElement isBaseImage={true} membro={getAPI[0]}/>}
				<section>
					{userRetrieved && <div style={{flex: 1}} id={'email'}>{userEmail}</div>}
					<h2>✅: {userRetrieved ? 0 : "n/a"}</h2>
					<h2>❌: {userRetrieved ? 0 : "n/a"}</h2>
				</section>
			</section>

			{userRetrieved &&
				<section className={"baixo"}>
					{getAPI.length > 0 &&
						<SingleEntryElement isBaseImage={false} membro={getAPI[0]}
											onClick={() => handleAnswer(true)}/>}
					{getAPI.length > 0 &&
						<SingleEntryElement isBaseImage={false} membro={getAPI[1]}
											onClick={() => handleAnswer(false)}/>}
					{getAPI.length > 0 &&
						<SingleEntryElement isBaseImage={false} membro={getAPI[2]}
											onClick={() => handleAnswer(false)}/>}
				</section>
			}
		</div>
	);
}

export default App;
