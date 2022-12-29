import React, {useEffect, useState} from "react";
import "./App.css";

const myHeaders = new Headers();
myHeaders.append("x-api-key", process.env?.REACT_APP_AWS_API_KEY ?? "foo");
// don't forget to add on the server: "Access-Control-Allow-Origin = *"

interface ApiResponseType {
	relatedimages: string[],
	baseimages: string[],
	name: string,
	cat: string,
}

const SingleEntryElement = ({membro, isBaseImage, onClick}: { membro: ApiResponseType, isBaseImage: boolean, onClick?: () => void }) => {
	return (
		<section className={"membro"} onClick={onClick}>
			<img
				src={isBaseImage ? process.env?.REACT_APP_CDN_URL + "/" + membro.baseimages[0] : process.env?.REACT_APP_CDN_URL + "/" + membro.relatedimages[0]}
				alt={membro.name}/>
			<pre style={{color: "black", textAlign: "center"}}>{membro.name}</pre>
		</section>
	)
};

const handleAnswer = (isCorrect: boolean) => {
	alert(isCorrect ? "✅" : "❌");
}

const handleUserRegistration = (email: string, setUserRetrieved: (v: boolean) => void) => {
	if (email === "") {
		return
	}
	// make fetch call to register user
	setUserRetrieved(true);
}

function App() {
	const [userEmail, setUserEmail] = useState<string>("");
	const [userRetrieved, setUserRetrieved] = useState<boolean>(false);
	const [apiResponse, setApiResponse] = useState<ApiResponseType[]>([]);
	useEffect(() => {
		const fetchPatrulhaCanina = async () => {
			const response = await fetch(
				process.env?.REACT_APP_AWS_API_URL + "/v3" ?? "foo",
				{
					method: "GET",
					headers: myHeaders,
				}
			);
			const data = await response.json();
			setApiResponse(data.data);
			return data;
		};
		fetchPatrulhaCanina().then(_ => null);
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
								   onKeyDown={(ev) => ev.key==='Enter' ? handleUserRegistration(userEmail, setUserRetrieved): null}
							/>
							<button
								onClick={() => handleUserRegistration(userEmail, setUserRetrieved)}
								disabled={userRetrieved}>OK
							</button>
						</section>
					</>)}
			</header>
			<section className={"cima"}>
				{apiResponse.length > 0 && <SingleEntryElement isBaseImage={true} membro={apiResponse[0]}/>}
				<section>
					{userRetrieved && <div style={{flex: 1}} id={'email'}>{userEmail}</div>}
					<h2>✅: {userRetrieved ? 0 : "n/a"}</h2>
					<h2>❌: {userRetrieved ? 0 : "n/a"}</h2>
				</section>
			</section>

			{userRetrieved &&
				<section className={"baixo"}>
					{apiResponse.length > 0 &&
						<SingleEntryElement isBaseImage={false} membro={apiResponse[0]} onClick={() => handleAnswer(true)}/>}
					{apiResponse.length > 0 &&
						<SingleEntryElement isBaseImage={false} membro={apiResponse[1]} onClick={() => handleAnswer(false)}/>}
					{apiResponse.length > 0 &&
						<SingleEntryElement isBaseImage={false} membro={apiResponse[2]} onClick={() => handleAnswer(false)}/>}
				</section>
			}
		</div>
	);
}

export default App;
