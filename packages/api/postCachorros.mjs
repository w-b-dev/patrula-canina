export const handler = async (event) => {
	const { body, stageVariables } = event;
	const { DB, REGION, KEYSPACE, TABLE, TOKEN } = stageVariables; // ALSO CLOUDFRONT
	const host = `https://${DB}-${REGION}.apps.astra.datastax.com`
	const path = `/api/rest/v2/keyspaces/${KEYSPACE}/${TABLE}`
	const headers = {
		'content-type': 'application/json',
		'x-cassandra-token': TOKEN,
	}

	const respPromise = await fetch(host + path, {
		method: 'POST',
		headers: headers,
		body: body,
	})
	const respParsed = await respPromise.json();
	return {
		statusCode: 201,
		body: JSON.stringify(respParsed),
	};
};
