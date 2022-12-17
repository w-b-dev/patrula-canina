export const handler = async (event) => {
    const host = 'https://76644382-5d3f-4b73-81f9-c4739122ba0d-us-east-1.apps.astra.datastax.com'
    const path = "/api/rest/v2/keyspaces/appcachorros/patrulhacanina"
    const headers = {
        'content-type': 'application/json',
        'x-cassandra-token': 'AstraCS:GUvJLheoXoeDTUJnxPJLjYek:24fcee4fd9f4aea550750fa9ad9eaa8594633e0f0870e955c17aec66b361cd44'
    }
    // build the request body
    const body = event.body
    // console.log('body', body);

    const respPromise = await fetch(host + path, {
        method: 'POST',
        headers: headers,
        body: body,
    })
    const respParsed = await respPromise.json();
    // console.log('respParsed', respParsed);
    return {
        statusCode: 201,
        body: JSON.stringify(respParsed),
    };
};
