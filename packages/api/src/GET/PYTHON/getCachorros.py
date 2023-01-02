import json
import http.client
import urllib.parse


def lambda_handler(event, context):
	# print(event)
	conn = http.client.HTTPSConnection(
		event['stageVariables']['DB'] + '-' + event['stageVariables']['REGION'] + '.apps.astra.datastax.com')
	payload = ''
	params = ''
	headers = {
		'content-type': 'application/json',
		'x-cassandra-token': event['stageVariables']['TOKEN']
	}
	domain = "foo/bar"
	request_path = event['path']
	request_path_array = request_path.split('/')
	relevant_path = request_path_array[1]
	# Check for WHICH PATH DID THE REQUEST CAME THROUGH
	# keyspace/table are not guaranteed to exist
	if relevant_path == "categories":
		domain = event['stageVariables']['KEYSPACE'] + '/' + event['stageVariables']['TABLE_CATEGORIES']
	if relevant_path == "entries":
		domain = event['stageVariables']['KEYSPACE'] + '/' + event['stageVariables']['TABLE_ENTRIES']
	if relevant_path == "users":
		domain = event['stageVariables']['KEYSPACE'] + '/' + event['stageVariables']['TABLE_USERS']

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
		if 'cat' in dict(event['queryStringParameters']).keys():
			if 'name' in dict(event['queryStringParameters']).keys():
				params = {
					"cat": {
						"$eq": event['queryStringParameters']['cat']
					},
					"name": {
						"$eq": event['queryStringParameters']['name']
					}
				}
			else:
				params = {
					"cat": {
						"$eq": event['queryStringParameters']['cat']
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
