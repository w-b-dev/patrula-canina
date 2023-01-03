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

export const getUser = async ({
	paramCat,
	paramEmail,
}: {
	paramCat: string;
	paramEmail: string;
}) => {
	const response = await fetch(
		(process.env?.REACT_APP_AWS_API_URL ?? "") +
			`/users?cat=${paramCat}&email=${paramEmail}`,
		{
			method: "GET",
			headers: myHeaders,
		}
	);
	return await response.json();
};

export const postUser = async ({
	paramCat,
	paramEmail,
	paramName,
}: {
	paramCat: string;
	paramEmail: string;
	paramName: string;
}) => {
	const response = await fetch(
		(process.env?.REACT_APP_AWS_API_URL ?? "") +
			`/users?cat=${paramCat}&email=${paramEmail}&name=${paramName}`,
		{
			method: "POST",
			headers: myHeaders,
		}
	);
	return await response.json();
};

// TODO: don't forget to add on the server: "Access-Control-Allow-Origin = *"
