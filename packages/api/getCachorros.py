import json
import http.client
import urllib.parse


def lambda_handler(event, context):
	# print(event)
	conn = http.client.HTTPSConnection("76644382-5d3f-4b73-81f9-c4739122ba0d-us-east-1.apps.astra.datastax.com")
	payload = ''
	headers = {
		'content-type': 'application/json',
		'x-cassandra-token': 'AstraCS:GUvJLheoXoeDTUJnxPJLjYek:24fcee4fd9f4aea550750fa9ad9eaa8594633e0f0870e955c17aec66b361cd44'
	}
	domain = "foo/bar"
	request_path = event['path']
	request_path_array = request_path.split('/')
	relevant_path = request_path_array[1]
	# print(relevant_path)
	# Check for WHICH PATH DID THE REQUEST CAME THROUGH
	# if dogs, use ENV keyspace_1/table_1
	# if games, use ENV keyspace_2/table_2
	if relevant_path == "dogs":
		domain = event['stageVariables']['KEYSPACE_1'] + '/' + event['stageVariables']['TABLE_1']
	if relevant_path == "games":
		domain = event['stageVariables']['KEYSPACE_2'] + '/' + event['stageVariables']['TABLE_2']

	url_final = "/api/rest/v2/keyspaces/" + domain + "/rows"
	# }'
	# ❎queryStringParameters pode ser NONE
	# https://stackoverflow.com/questions/3887381/typeerror-nonetype-object-is-not-iterable-in-python
	if event['queryStringParameters'] is not None:
		if 'nome' in dict(event['queryStringParameters']).keys():
			params = {
				"nome": {
					"$eq": event['queryStringParameters']['nome']
				}
			}
		if 'category' in dict(event['queryStringParameters']).keys():
			params = {
				"category": {
					"$eq": event['queryStringParameters']['category']
				}
			}
		# this is the build inside the if
		url_final = "/api/rest/v2/keyspaces/" + domain + "?where=" + urllib.parse.quote(
			json.dumps(params))
	# print(url_final)

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
