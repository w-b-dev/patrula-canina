import json
import http.client
import urllib.parse


def lambda_handler(event, context):
	# print(event);
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
			url_final = '/api/rest/v2/keyspaces/appcachorros/patrulhacanina?where=' + urllib.parse.quote(
				json.dumps(params))
			print(url_final)

	conn.request("GET", url_final, payload, headers)
	res = conn.getresponse()
	data = res.read()

	allowed_origin = '*'
	if event['multiValueHeaders'] is not None:
		if 'origin' in dict(event['multiValueHeaders']).keys():
			# TODO: check if value matches a list of allowed domains instead
			# below I am just inserting the header for the requesting origin
			# it is the same as `*` at the moment
			allowed_origin = event['multiValueHeaders']['origin'][0]

	return {
		'statusCode': 200,
		'body': json.dumps(json.loads(data)),
		'headers': {
			'Access-Control-Allow-Origin': allowed_origin
		}
	}
