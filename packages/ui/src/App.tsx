import React, {useEffect, useState} from "react";
import "./App.css";

const myHeaders = new Headers();
myHeaders.append("x-api-key", process.env?.REACT_APP_AWS_API_KEY ?? "foo");
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
				relatedimages: [],
				baseimages: [],
				name: "",
				cat: "",
			},
		],
	});
	useEffect(() => {
		const fetchPatrulhaCanina = async () => {
			const response = await fetch(
				process.env?.REACT_APP_AWS_API_URL + "/v3" ?? "foo",
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
			<section className={"membro"} key={membro.name}>
				<img src={process.env?.REACT_APP_CDN_URL ?? "" + "/" + membro.baseimages[0]} alt={membro.name}/>
				<pre style={{color: "black", textAlign: "center"}}>{membro.name}</pre>
			</section>
		);
	});
	const options = [0, 1, 2, 4, 5, 6, 7];
	const randomOption = () => {
		const randomPointerInRange = Math.trunc(Math.random() * options.length);
		const valueLeftFound = options[randomPointerInRange !== options.length ? randomPointerInRange : options.length - 1];
		options.splice(randomPointerInRange, 1)
		return valueLeftFound
	}
	return (
		<div className="App">
			<section className={"cima"}>
				{caoHTML[3]}
				<section>
					<h2>✅: 0</h2>
					<h2>❌: 0</h2>
				</section>
			</section>

			<section className={"baixo"}>
				{caoHTML[randomOption()]}
				{caoHTML[randomOption()]}
			</section>
		</div>
	);
}

export default App;
