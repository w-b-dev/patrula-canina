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

//type EqualsParam struct {
//	Equal string `json:"$eq"`
//}

//type GetRequestWhereClause struct {
//	Category EqualsParam `json:"category"`
//	Entry    EqualsParam `json:"entry"`
//}

type PostRequestBody struct {
	Category string `json:"category"`
	Entry    string `json:"entry"`
	Matches  string `json:"matches"`
}

func HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// return early if path is not "path": "/games",
	if request.Path != "/games" {
		return events.APIGatewayProxyResponse{
			StatusCode: 404,
			Body:       "Not Found",
		}, nil
	}

	// evaluate if required parameters are present
	if request.QueryStringParameters["category"] == "" || request.QueryStringParameters["entry"] == "" || request.QueryStringParameters["stringPayload"] == "" {
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       "Request is missing required parameters",
		}, nil
	}

	// BUILD URLS AS CONSTANTS
	host := "https://" + request.StageVariables["DB"] + "-" + request.StageVariables["REGION"] + ".apps.astra.datastax.com"
	path := "/api/rest/v2/keyspaces/" + request.StageVariables["KEYSPACE_2"] + "/" + request.StageVariables["TABLE_2"]

	// Alternative for another time: use the Go SDK for Astra (or Stargate)
	//https://stargate.io/docs/latest/develop/api-grpc/gRPC-go-client.html
	// TODO: GET THE CURRENT ENTRIES IN THE COLUMN "MATCHES" FOR THE GIVEN ENTRY
	//whereClause := GetRequestWhereClause{
	//	Category: EqualsParam{
	//		Equal: request.QueryStringParameters["category"],
	//	},
	//	Entry: EqualsParam{
	//		Equal: request.QueryStringParameters["entry"],
	//	},
	//}
	//encodeJSON, err := json.Marshal(whereClause)
	//where := "?where=" + encodeJSON(whereClause)
	//getRequest, err := http.Get(host + path + where)

	// TODO: ADD 'STRINGPAYLOAD' TO THE COLUMN "MATCHES" FOR THE GIVEN ENTRY

	// queryStringParameters
	requestParams := PostRequestBody{
		Category: request.QueryStringParameters["category"],
		Entry:    request.QueryStringParameters["entry"],
		Matches:  request.QueryStringParameters["stringPayload"],
	}

	marshalBody, err := json.Marshal(requestParams)
	if err != nil {
		fmt.Print(err.Error())
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Something went wrong with the body marshalling",
		}, nil
	}
	// call database with the existing parameters
	postRequest, err := http.NewRequest(http.MethodPost, host+path, bytes.NewReader(marshalBody))
	// TODO 1 note on the above: the marshalled body is a byte array, and we need to convert it to a Reader
	if err != nil {
		fmt.Print(err.Error())
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Something went wrong with the request creation",
		}, nil
	}
	postRequest.Header.Set("Content-Type", "application/json")
	postRequest.Header.Set("x-cassandra-token", request.StageVariables["TOKEN"])

	client := &http.Client{}
	resp, err := client.Do(postRequest)
	if err != nil {
		fmt.Print(err.Error())
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Something went wrong with the client (Do) request",
		}, nil
	}

	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {
			fmt.Println(err)
		}
	}(postRequest.Body)
	// TODO: 2 note on the below: the response body is a stream of bytes.
	// We need to make it a reader
	// bytes[] --> reader
	// reader --> bytes[]
	// https://pkg.go.dev/bytes#NewBuffer
	parsedBody, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Print(err.Error())
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       "Something went wrong with reading the incoming response body",
		}, nil
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
	// add request handler for AWS API Gateway
	lambda.Start(HandleRequest)
}
