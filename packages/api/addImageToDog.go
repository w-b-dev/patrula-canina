package main

// https://docs.aws.amazon.com/lambda/latest/dg/golang-handler.html
// https://github.com/aws/aws-lambda-go/
import (
	"context"
	"github.com/aws/aws-lambda-go/lambda"
)

type MyEvent struct {
	Nome string `json:"nome"`
	Raca string `json:"raca"`
}

type MyResponse struct {
	//Message string `json:"Response"`
	Message string
}

func HandleRequest(ctx context.Context, ev MyEvent) (string, error) {
	res := "dog's name " + ev.Nome + " dog's breed: " + ev.Raca
	return (res), nil
	//return fmt.Sprintf("Hello %s!", name.Name), nil
}

func main() {
	//	add request handler for AWS API Gateway
	lambda.Start(HandleRequest)
}
