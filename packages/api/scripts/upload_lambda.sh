#!/usr/bin/env sh

updatePythonCode() {
	echo "Updating Python code"
	echo "rename file to what AWS expects"
	cp getCachorros.py lambda_function.py
	echo "zip the executable"
	zip lambda_function.zip lambda_function.py
	echo "delete source (renamed)"
	rm lambda_function.py
	echo "upload to AWS started"
	aws lambda update-function-code --function-name getCachorros --zip-file fileb://lambda_function.zip | jq -S '.LastUpdateStatus'
	echo "removes uploaded file"
	rm lambda_function.zip
	echo "upload to AWS finished"
}

updateJavaScriptCode() {
	echo "Updating JavaScript code"
	echo "rename file to what AWS expects"
	cp postCachorros.mjs index.mjs
	echo "zip the executable"
	zip index.zip index.mjs
	echo "delete source (renamed)"
	rm index.mjs
	echo "upload to AWS started"
	aws lambda update-function-code --function-name putCachorros --zip-file fileb://index.zip | jq -S '.LastUpdateStatus'
	echo "removes uploaded file"
	rm index.zip
	echo "upload to AWS finished"
}

updateGoCode() {
	echo "Updating Go code"
	echo "rename file to what AWS expects"
	cp addImageToDog.go main.go
	echo "create the executable file"
	GOOS=linux GOARCH=amd64 go build -o main main.go
	echo "delete source (renamed)"
	if [ ! -e main ]; then
		exit 1
	fi
	rm main.go
	echo "zip the executable"
	zip main.zip main
	echo "remove the executable"
	rm main
	echo "upload to AWS started"
	aws lambda update-function-code --function-name addImageToDog --zip-file fileb://main.zip | jq -S '.LastUpdateStatus'
	echo "removes uploaded file"
	rm main.zip
	echo "upload to AWS finished"
}

if [ "$1" = "go" ]; then
	updateGoCode
elif [ "$1" = "py" ]; then
	updatePythonCode
elif [ "$1" = "js" ]; then
	updateJavaScriptCode
else
	echo "Unknown language"
	exit 1
fi
