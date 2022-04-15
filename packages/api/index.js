// TODO: criar api gateway para GET e POST

function handlePOST(event) {
	const { path, httpMethod } = event;
	return {
		statusCode: 201, // method not allowed
		body: `Metodo ${httpMethod} permitido em ${path}`,
	};
}
function handleGET(event) {
	const { path, httpMethod } = event;
	return {
		statusCode: 200, // method not allowed
		body: `Metodo ${httpMethod} permitido em ${path}`,
	};
}
function handleMethodNotAllowed(event) {
	const { path, httpMethod } = event;
	return {
		statusCode: 403, // method not allowed
		body: `Metodo ${httpMethod} nao permitido em ${path}`,
	};
}

exports.handler = async (event) => {
	const { httpMethod } = event;

	switch (httpMethod.toUpperCase()) {
		case "POST":
			return handlePOST(event);
		case "GET":
			return handleGET(event);
		default:
			return handleMethodNotAllowed(event);
	}
};
