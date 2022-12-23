package main

// https://docs.aws.amazon.com/lambda/latest/dg/golang-handler.html
// https://github.com/aws/aws-lambda-go/
import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

//type ResponseBody struct {
//	Foo string `json:"foo"`
//	Bar string `json:"bar"`
//}

func HandleRequest(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	fmt.Printf("Processing request data for request %s.\n", request.RequestContext.RequestID)
	fmt.Printf("Body size = %d.\n", len(request.Body))
	fmt.Println("Headers:")
	for key, value := range request.Headers {
		fmt.Printf("    %s: %s\n", key, value)
	}
	stringifiedRequest, _ := json.Marshal(request)
	//	prepare response
	//body := ResponseBody{
	//	Foo: string(stringifiedRequest),
	//Bar: string(stringifiedRequest),
	//}

	//bodyStringified, _ := json.Marshal(body)

	response := events.APIGatewayProxyResponse{
		StatusCode:        201,
		Headers:           nil,
		MultiValueHeaders: nil,
		Body:              string(stringifiedRequest),
		IsBase64Encoded:   false,
	}

	return response, nil
}

func main() {
	//	add request handler for AWS API Gateway
	lambda.Start(HandleRequest)
}
