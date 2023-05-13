import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaStack } from "./LambdaStack";
import {ApiStack} from "./ApiStack";


export class PipelineStage extends Stage {

    constructor(scope: Construct, id: string, props: StageProps) {
        super(scope, id, props)

        const lambdaStack = new LambdaStack(this, 'LambdaStack', {
            stageName: props.stageName
        })

        new ApiStack(this, 'ApiStack', {
            photosLambdaIntegration: lambdaStack.photosLambdaIntegration,
        });
    }
}