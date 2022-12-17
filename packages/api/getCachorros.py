import json
import http.client
import urllib.parse


def lambda_handler(event, context):
    conn = http.client.HTTPSConnection("76644382-5d3f-4b73-81f9-c4739122ba0d-us-east-1.apps.astra.datastax.com")
    payload = ''
    headers = {
        'content-type': 'application/json',
        'x-cassandra-token': 'AstraCS:GUvJLheoXoeDTUJnxPJLjYek:24fcee4fd9f4aea550750fa9ad9eaa8594633e0f0870e955c17aec66b361cd44'
    }
    url_final = "/api/rest/v2/keyspaces/appcachorros/patrulhacanina/rows"
    # }'
    # ❎queryStringParameters pode ser NONE
    # https://stackoverflow.com/questions/3887381/typeerror-nonetype-object-is-not-iterable-in-python
    if event['queryStringParameters'] is not None:
        if 'nome' in dict(event['queryStringParameters']).keys():
            # if 'nome' in event['queryStringParameters']:
            print(event['queryStringParameters']['nome'])
            params = {
                "nome": {
                    "$eq": event['queryStringParameters']['nome']
                }
            }
            # https://docs.python.org/3.10/library/urllib.request.html#urllib-examples
            url_final = '/api/rest/v2/keyspaces/appcachorros/patrulhacanina?where=' + urllib.parse.quote(
                json.dumps(params))
            # print(url_final)

    conn.request("GET", url_final, payload, headers)
    res = conn.getresponse()
    data = res.read()
    # print(data.decode("utf-8"))

    return {
        'statusCode': 200,
        'body': json.dumps(json.loads(data))
    }
# lambda_handler('', '')
#     curl -s -L -G 'http://localhost:8082/v2/keyspaces/users_keyspace/users' \
#                   -H "X-Cassandra-Token: $AUTH_TOKEN" \
#                      -H "Content-Type: application/json" \
#                         -H "Accept: application/json" \
#                            --data-urlencode 'where={
#     "firstname": {"$in": ["Janesha","Mookie"]}
