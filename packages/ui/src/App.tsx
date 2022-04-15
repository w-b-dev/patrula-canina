import React from "react";
import "./App.css";

function App() {
	return (
		<div className="App">
			<section className={"cima"}>
				<img
					src="https://images.unsplash.com/photo-1595250507659-56656e8a30a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
					alt="cao deitado na praia"
				/>
			</section>
			<section className={"baixo"}>
				<div className="container-imagens">
					<img
						src="https://www.educacaoetransformacao.com.br/wp-content/uploads/2019/11/marshall-patrulha-canina-png-imagem-5.png"
						alt="marshall"
					/>
					<img
						src="https://3.bp.blogspot.com/-U0iIoon8vxo/XJU-mwglYxI/AAAAAAAAAjk/U4D9GSV5zy8T6bpbW0ZW6GsYnyLUf8SvQCLcBGAs/s1600/patrulha-canina-chase-03.png"
						alt="Chase"
					/>
				</div>
			</section>
		</div>
	);
}

export default App;
