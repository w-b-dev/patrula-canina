#!/usr/bin/zsh

function load_categories_to_astra() {
	curl --location --request POST 'https://76644382-5d3f-4b73-81f9-c4739122ba0d-us-east-1.apps.astra.datastax.com/api/rest/v2/keyspaces/v3/categories' \
		--header 'content-type: application/json' \
		--header 'x-cassandra-token: '"$ASTRA_SHELL_MENIFEE_TOKEN"'' \
		--data-raw '{
    "category": "'$1'",
    "images": ["'$2'"]
}'
}

function load_entries_to_astra() {
	curl --location --request POST 'https://76644382-5d3f-4b73-81f9-c4739122ba0d-us-east-1.apps.astra.datastax.com/api/rest/v2/keyspaces/v3/entries_by_category' \
		--header 'content-type: application/json' \
		--header 'x-cassandra-token: '"$ASTRA_SHELL_MENIFEE_TOKEN"'' \
		--data-raw '{
        "cat": "'$1'",
        "name": "'$2'",
        "baseimages": ["'$3'"],
        "relatedimages": ["'$4'"]
    }'
}

if [ "$1" = "categories.txt" ]; then
	# load from file and call the function the output
	cat "$1" | while read line; do
		IFS=',' read -r cat url <<<"$line"
		load_categories_to_astra $cat $url
	done
elif [ "$1" = "entries.txt" ]; then
	cat "$1" | while read line; do
		IFS=',' read -r cat name base related <<<"$line"
		load_entries_to_astra $cat $name $base $related
	done
elif [ "$1" = "post" ]; then
	callPost "$@"
else
	echo "Unknown language"
fi
