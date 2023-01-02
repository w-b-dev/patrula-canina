#!/usr/bin/env sh

updatePythonCode() {
	echo "Updating Python code"
	cd ../src/GET/PYTHON || exit
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
	cd ../src/POST/JS || exit
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

updateGetUsers() {
	echo "Updating JavaScript code"
	cd ../src/GET/JS || exit
	echo "rename file to what AWS expects"
	cp getUsers.mjs index.mjs
	echo "zip the executable"
	zip index.zip index.mjs
	echo "delete source (renamed)"
	rm index.mjs
	echo "upload to AWS started"
	aws lambda update-function-code --function-name getUsers --zip-file fileb://index.zip | jq -S '.LastUpdateStatus'
	echo "removes uploaded file"
	rm index.zip
	echo "upload to AWS finished"
}

updateGoCode() {
	echo "Updating Go code"
	cd ../src/PATCH/GO || exit
	#	echo "rename file"
	cp addImageToDog.go main.go
	echo "create the executable file"
	GOOS=linux GOARCH=amd64 go build main.go
	echo "zip the executable"
	zip main.zip main
	echo "upload to AWS started"
	aws lambda update-function-code --function-name addImageToDog --zip-file fileb://main.zip | jq -S '.LastUpdateStatus'
	echo "clean up: remove the executable"
	rm main
	echo "clean up: remove the renamed source"
	rm main.go
	echo "clean up: removes uploaded zip"
	rm main.zip
	echo "upload to AWS finished"
}

if [ "$1" = "go" ]; then
	updateGoCode
elif [ "$1" = "py" ]; then
	updatePythonCode
elif [ "$1" = "js" ]; then
	updateJavaScriptCode
elif [ "$1" = "getusers" ]; then
	updateGetUsers
else
	echo "Unknown language"
	exit 1
fi
