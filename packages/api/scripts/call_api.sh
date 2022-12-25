#!/usr/bin/env sh

callGet() {
	echo "Updating GET code"
	curl --location --request GET 'https://yzpm2ts842.execute-api.ca-central-1.amazonaws.com/PROD/dogs' \
		--header 'x-api-key: xRBIhhHdC78UNHr51LNCJ7BnpmtWr9LJ9kpc3MjZ' | jq -S '.data[] | {(.nome): .raca}'
}

#callGet

callGetOne() {
	echo "Updating GET one code"
	if [ -z "$2" ]; then
		echo "Missing dog name"
		exit 1
	fi
	curl --location --request GET 'https://yzpm2ts842.execute-api.ca-central-1.amazonaws.com/PROD/dogs?nome='"$2" \
		--header 'x-api-key: xRBIhhHdC78UNHr51LNCJ7BnpmtWr9LJ9kpc3MjZ' | jq -S '.data[] | {(.nome): .raca}'
}

#callGetOne "$@"

callPost() {
	if [ -z "$2" ]; then
		echo "Missing dog name"
		exit 1
	fi

	if [ -z "$3" ]; then
		echo "Missing dog breed"
		exit 1
	fi

	echo "Updating POST code"
	curl --location --request PUT 'https://yzpm2ts842.execute-api.ca-central-1.amazonaws.com/PROD/dogs' \
		--header 'x-api-key: xRBIhhHdC78UNHr51LNCJ7BnpmtWr9LJ9kpc3MjZ' \
		--header 'Content-Type: application/json' \
		--data-raw '{
      "nome": "'"$2"'",
      "raca": "'"$3"'"
  }' | jq -S '.'
}

callAddImage() {
	if [ -z "$2" ]; then
		echo "Missing dog name"
		exit 1
	fi

	if [ -z "$3" ]; then
		echo "Missing IMAGEM filename"
		exit 1
	fi

	echo "Updating ADD IMAGE"
	curl --location --request POST 'https://yzpm2ts842.execute-api.ca-central-1.amazonaws.com/PROD/dogs/'"$2"'/images' \
		--header 'x-api-key: xRBIhhHdC78UNHr51LNCJ7BnpmtWr9LJ9kpc3MjZ' \
		--header 'Content-Type: application/json' \
		--data-raw '{
      "imagem": "'"$3"'"
  }' | jq -S '.'
}

if [ "$1" = "get" ]; then
	if [ -z "$2" ]; then
		callGet
	else
		callGetOne "$@"
	fi
elif [ "$1" = "put" ]; then
	callAddImage "$@"
elif [ "$1" = "post" ]; then
	callPost "$@"
else
	echo "Unknown language"
fi
