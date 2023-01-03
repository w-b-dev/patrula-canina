import React, { useEffect, useState } from "react";
import "./App.css";
import { ApiResponseType, User } from "./interfaces";
import { SingleEntryElement } from "./SingleEntryElement";
import { getAllEntries } from "./api";
import { handleUserRegistration, handleAnswer } from "./Handlers";

function App() {
	const [userEmail, setUserEmail] = useState<string>("");
	const [userRetrieved, setUserRetrieved] = useState<User | null>(null);
	const [getAPI, setGetAPI] = useState<ApiResponseType[]>([]);

	useEffect(() => {
		getAllEntries().then((data) => setGetAPI(data.data));
	}, [userRetrieved]);

	return (
		<div className="App">
			<header style={{ display: "flex", flexDirection: "column" }}>
				<h1
					style={{
						textAlign: "center",
						margin: 0,
						padding: 0,
						textDecoration: "underline",
						color: "#222",
					}}
				>
					Patrulha Canina
				</h1>
				{!userRetrieved && (
					<>
						<label
							htmlFor="email"
							style={{ flex: 1, textAlign: "center", marginTop: "1rem" }}
						>
							USERNAME:
						</label>
						<section
							style={{
								display: "flex",
								padding: "0 1rem",
								maxWidth: "400px",
								margin: "auto",
							}}
						>
							<input
								type="email"
								style={{ flex: 1 }}
								inputMode={"email"}
								translate={"no"}
								autoFocus={true}
								id={"email"}
								value={userEmail}
								onChange={(v) => setUserEmail(v.currentTarget.value)}
								onKeyDown={(ev) =>
									ev.key === "Enter"
										? handleUserRegistration(userEmail, setUserRetrieved)
										: null
								}
							/>
							<button
								onClick={() =>
									handleUserRegistration(userEmail, setUserRetrieved)
								}
								disabled={!!userRetrieved}
							>
								OK
							</button>
						</section>
					</>
				)}
			</header>
			{!!userRetrieved && (
				<section className={"cima"}>
					<section className={"user-and-points"}>
						<h2 style={{ fontSize: "xx-large" }} id={"email"}>
							{userRetrieved.name}
						</h2>
						<h3 style={{ fontSize: "xx-large" }}>✅: {userRetrieved.won}</h3>
						<h3 style={{ fontSize: "xx-large" }}>❌: {userRetrieved.lost}</h3>
					</section>
					<section
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<button onClick={() => window.location.reload()}>Sair</button>
					</section>
				</section>
			)}

			{userRetrieved && (
				<>
					<section
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{getAPI.length > 0 && (
							<SingleEntryElement isBaseImage={true} membro={getAPI[0]} />
						)}
					</section>
					<section className={"baixo"}>
						{getAPI.length > 0 && (
							<SingleEntryElement
								isBaseImage={false}
								membro={getAPI[0]}
								onClick={() => handleAnswer(true)}
							/>
						)}
						{getAPI.length > 0 && (
							<SingleEntryElement
								isBaseImage={false}
								membro={getAPI[1]}
								onClick={() => handleAnswer(false)}
							/>
						)}
						{getAPI.length > 0 && (
							<SingleEntryElement
								isBaseImage={false}
								membro={getAPI[2]}
								onClick={() => handleAnswer(false)}
							/>
						)}
					</section>
				</>
			)}
		</div>
	);
}

export default App;
