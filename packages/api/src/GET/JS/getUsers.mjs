export const handler = async (event) => {
	console.log({event});
	const {httpMethod, stageVariables, path, requestContext} = event;
	const {DB, REGION, TABLE_3_USERS, KEYSPACE, TOKEN} = stageVariables;
	const host = `https://${DB}-${REGION}.apps.astra.datastax.com`

	if (httpMethod !== 'GET') {
		return {
			statusCode: 405,
			body: JSON.stringify({error: 'Method not allowed'})
		};
	}

	if (path.split('/')[1] !== 'users') {
		return {
			statusCode: 404,
			body: JSON.stringify({error: 'Not Found'}),
		};
	}

	// TODO: add params to query for specific user
	const evaluatedPath = `/api/rest/v2/keyspaces/${KEYSPACE}/${TABLE_3_USERS}`;

	const headers = {
		'content-type': 'application/json',
		'x-cassandra-token': TOKEN,
		'Access-Control-Allow-Origin': requestContext?.domainName ?? "*", //TODO: add func to filter origins
	}

	const respPromise = await fetch(host + evaluatedPath, {
		method: 'GET',
		headers: headers
	})
	const respParsed = await respPromise.json();
	return {
		statusCode: 201,
		body: JSON.stringify(respParsed),
	};
};
