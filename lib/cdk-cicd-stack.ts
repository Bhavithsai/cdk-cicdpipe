import * as cdk from 'aws-cdk-lib';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines'; 
import { Construct } from 'constructs';
// import { CodePipeline } from 'aws-cdk-lib/pipelines';


export class CdkCicdStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    new CodePipeline(this, 'firstPipeline',{
      pipelineName:'firstPipeline',
      synth: new ShellStep('Synth',{
        input: CodePipelineSource.gitHub('Bhavithsai/cdk-cicdpipe', 'master'),
        commands: [ 
          'npm ci', 
          'npx cdk synth', // Instructs CodeBuild to install required packages
        ],
        // primaryOutputDirectory: './cdk.out',
      })
    })

  }
}
