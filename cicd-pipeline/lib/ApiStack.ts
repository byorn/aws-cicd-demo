import { Stack, StackProps } from 'aws-cdk-lib'
import { AuthorizationType, CognitoUserPoolsAuthorizer, Cors, LambdaIntegration, MethodOptions, ResourceOptions, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface ApiStackProps extends StackProps {
    photosLambdaIntegration: LambdaIntegration,
}

export class ApiStack extends Stack {

    constructor(scope: Construct, id: string, props: ApiStackProps) {
        super(scope, id, props);

        const api = new RestApi(this, 'PhotosApi');

        const optionsWithCors: ResourceOptions = {
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS,
                allowMethods: Cors.ALL_METHODS
            }
        }

        const optionsWithAuth: MethodOptions = {}

        const spacesResource = api.root.addResource('photos', optionsWithCors);
        spacesResource.addMethod('GET', props.photosLambdaIntegration, optionsWithAuth);
        spacesResource.addMethod('POST', props.photosLambdaIntegration,optionsWithAuth);
        spacesResource.addMethod('PUT', props.photosLambdaIntegration, optionsWithAuth);
        spacesResource.addMethod('DELETE', props.photosLambdaIntegration, optionsWithAuth);
    }
}