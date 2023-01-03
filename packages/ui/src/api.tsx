export const myHeaders = new Headers();
myHeaders.append("x-api-key", process.env?.REACT_APP_AWS_API_KEY ?? "foo");

export const getAllEntries = async () => {
	const response = await fetch(
		(process.env?.REACT_APP_AWS_API_URL ?? "") + "/entries",
		{
			method: "GET",
			headers: myHeaders,
		}
	);
	return await response.json();
};

// TODO: don't forget to add on the server: "Access-Control-Allow-Origin = *"
