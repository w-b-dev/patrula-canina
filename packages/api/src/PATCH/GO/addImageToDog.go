package main

// https://docs.aws.amazon.com/lambda/latest/dg/golang-handler.html
// https://github.com/aws/aws-lambda-go/
import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"io"
	"net/http"
)

type RequestBody struct {
	Category string `json:"category"`
	Entry    string `json:"entry"`
}

func HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	//fmt.Printf("Processing request data for request %s.\n", request.RequestContext.RequestID)
	//fmt.Printf("Body size = %d.\n", len(request.Body))
	//fmt.Println("Headers:")
	//for key, value := range request.Headers {
	//	fmt.Printf("    %s: %s\n", key, value)
	//}

	// return early if path is not "path": "/games",
	if request.Path != "/games" {
		return events.APIGatewayProxyResponse{
			StatusCode: 404,
			Body:       "Not Found",
		}, nil
	}

	// evaluate if required parameters are present
	if request.QueryStringParameters["category"] == "" || request.QueryStringParameters["entry"] == "" {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Bad Request",
		}, nil
	}
	// queryStringParameters
	requestParams := RequestBody{
		Category: request.QueryStringParameters["category"],
		Entry:    request.QueryStringParameters["entry"],
	}

	goodBody, err := json.Marshal(requestParams)

	host := "https://" + request.StageVariables["DB"] + "-" + request.StageVariables["REGION"] + ".apps.astra.datastax.com"
	path := "/api/rest/v2/keyspaces/" + request.StageVariables["KEYSPACE_2"] + "/" + request.StageVariables["TABLE_2"]

	// call database with the existing parameters
	customRequest, err := http.NewRequest(http.MethodPost, host+path, bytes.NewReader(goodBody))
	if err != nil {
		// handle error
		fmt.Print(err.Error())
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Something went wrong with the request creation",
		}, nil
	}
	customRequest.Header.Set("Content-Type", "application/json")
	customRequest.Header.Set("x-cassandra-token", request.StageVariables["TOKEN"])

	client := &http.Client{}
	resp, err := client.Do(customRequest)

	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			fmt.Println(err)
		}
	}(customRequest.Body)
	// have the body converted as bytes[]
	parsedBody, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
	}

	response := events.APIGatewayProxyResponse{
		StatusCode:        resp.StatusCode,
		Headers:           map[string]string{},
		MultiValueHeaders: nil,
		Body:              string(parsedBody),
		IsBase64Encoded:   false,
	}

	return response, nil
}

func main() {
	//	add request handler for AWS API Gateway
	lambda.Start(HandleRequest)
}
