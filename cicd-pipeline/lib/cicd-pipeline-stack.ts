import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodeBuildStep, CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { PipelineStage } from './PipelineStage';

export class CicdPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'DemoCICDPipeline', {
      pipelineName: 'DemoCICDPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('byorn/aws-cicd-demo', 'main'),
        commands: [
          'cd cicd-pipeline',
          'npm ci',
          'npx cdk synth'
        ],
        primaryOutputDirectory: 'cicd-pipeline/cdk.out'
      })
    });

    /** main branch is being built and deployed **/
    const prodStage = pipeline.addStage(new PipelineStage(this, 'PipelineStage', {
      stageName: 'prod'
    }));

    prodStage.addPre(new CodeBuildStep('unit-tests', {
      commands: [
        'cd backend',
        'npm ci',
        'npm test'
      ]
    }))
  }
}
