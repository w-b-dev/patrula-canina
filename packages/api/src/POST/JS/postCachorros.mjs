export const handler = async (event) => {
	console.log(JSON.stringify(event));
	const {body, stageVariables, path} = event;
	const {DB, REGION, KEYSPACE_1, TABLE_1, KEYSPACE_2, TABLE_2, TOKEN} = stageVariables; // ALSO CLOUDFRONT
	const host = `https://${DB}-${REGION}.apps.astra.datastax.com`
	// check if path is `dogs`; if it is not, it is `games` (as currently configured)
	const evaluatedPath = path.split('/')[1] === 'dogs'
		? `/api/rest/v2/keyspaces/${KEYSPACE_1}/${TABLE_1}`
		: `/api/rest/v2/keyspaces/${KEYSPACE_2}/${TABLE_2}`;

	const headers = {
		'content-type': 'application/json',
		'x-cassandra-token': TOKEN,
	}

	const respPromise = await fetch(host + evaluatedPath, {
		method: 'POST', // this is the only operation handled by this function
		headers: headers,
		body: body,
	})
	const respParsed = await respPromise.json();
	return {
		statusCode: 201,
		body: JSON.stringify(respParsed),
	};
};
