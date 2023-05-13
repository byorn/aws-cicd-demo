import { Stack, StackProps } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";
import {LambdaIntegration} from "aws-cdk-lib/aws-apigateway";


interface LambdaStackProps extends StackProps {
    stageName?: string
}

export class LambdaStack extends Stack {

    public readonly photosLambdaIntegration: LambdaIntegration
    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props)

        const photosLamda = new NodejsFunction(this, 'photo-services', {
            runtime: Runtime.NODEJS_18_X,
            handler: 'handler',
            entry: (join(__dirname, '..', '..', 'backend', 'src','services','photo-service.ts')),
            environment: {
                STAGE: props.stageName!
            }
        })

        this.photosLambdaIntegration = new LambdaIntegration(photosLamda)
    }
}