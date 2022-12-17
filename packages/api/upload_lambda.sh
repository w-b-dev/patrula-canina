#!/usr/bin/env sh

echo "rename file to what AWS expects"
cp addImageToDog.go main.go
echo "create the executable file"
GOOS=linux GOARCH=amd64 go build -o main main.go
echo "delete source (renamed)"
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
