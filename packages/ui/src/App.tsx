import React, { useEffect, useState } from "react";
import "./App.css";

const myHeaders = new Headers();
myHeaders.append("x-api-key", "xRBIhhHdC78UNHr51LNCJ7BnpmtWr9LJ9kpc3MjZ");
// don't forget to add on the server: "Access-Control-Allow-Origin = *"

const requestOptions = {
	method: "GET",
	headers: myHeaders,
};

function App() {
	const [membros, setMembros] = useState({
		count: 0,
		data: [
			{
				imagem: "",
				nome: "",
				raca: "",
			},
		],
	});
	useEffect(() => {
		const fetchPatrulhaCanina = async () => {
			const response = await fetch(
				"https://yzpm2ts842.execute-api.ca-central-1.amazonaws.com/PROD/dogs",
				requestOptions
			);
			const data = await response.json();
			// console.log(data);
			setMembros(data);
			return data;
		};
		fetchPatrulhaCanina().then(_ => null);
	}, []);

	const caoHTML = membros.data.map((membro) => {
		return (
			<section className={"membro"} key={membro.nome}>
				<img src={membro.imagem} alt={membro.nome} />
				<pre style={{ color: "black", textAlign: "center" }}>{membro.raca}</pre>
			</section>
		);
	});

	return (
		<div className="App">
			<section className={"cima"}>
				{caoHTML[3]}
			</section>

			<section className={"baixo"}>
				<div className="container-imagens">
					{caoHTML[0]}
					{caoHTML[6]}
				</div>
			</section>
		</div>
	);
}

export default App;
