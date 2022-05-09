
pipeline {
         agent any
         environment{
             PROJECT_ID = 'adminpage-chicago'
             CLUSTER_NAME = 'adminpage-chicago-k8s'
             LOCATION = 'us-east4-b'
             CREDENTIALS_ID = 'gke'
             registry ='pavlohortovenko20/adminpage2.1'
             registryCredential ='dockerhub_cred'
             gitgetvers ='git rev-parse --short  HEAD'
             kubernetesSetVersion ='kubectl set image deployment/adminpage-deployment adminpage2.1:latest=adminpage2.1:latest:${gitgetvers} --record'
             checkContainer='docker images -f ""'
            }
         stages {
                 stage('Checout') {
                 steps {
                     checkout([$class: 'GitSCM', branches: [[name: '*/pipeline']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/carrectly/adminpage.git']]])
                    }
                 } 
                  stage('set env') {
                  steps {
                     script {
                         sh'set "s/tagVersion/$1/g" pods.yaml > adminpage-deploy.yaml read tagVersion'
                        }
                     }
                  }
                 stage('Build') {
                 steps  {
                     script {
                        sh 'echo GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID  >>.env'
                        sh 'echo GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET  >>.env'
                        sh 'echo GOOGLE_CALLBACK=$GOOGLE_CALLBACK  >>.env'
                        sh 'echo GOOGLE_REFRESH_TOKEN=$GOOGLE_REFRESH_TOKEN  >>.env'
                        sh 'echo DOMAIN =$DOMAIN  >>.env'
                        sh 'echo squareApplicationId =$squareApplicationId   >>.env'
                        sh 'echo SQUARE_TOKEN =$SQUARE_TOKEN  >>.env'
                        sh 'echo squareBasePath =$squareBasePath    >>.env'
                        sh 'echo SQUARE_LOCATION_ID=$SQUARE_LOCATION_ID  >>.env'
                        sh 'echo travisApiToken=$travisApiToken >>.env '
                        dockerImage=docker.build tagVersion  registry 
                    }
                 }
                 stage('Push image to registry') {
                 steps {
                     script{ 
                          docker.withRegistry( '', registryCredential ) {
                          dockerImage.push(tagVersion)
                            }
                        }
                    }
                }
                stage('Remove older images') {
                 steps {
                         sh 'docker rmi $(docker images -q)'
                        }
                }
                 stage('Deploy to GKE') { 
                 steps { 
                    step([
                    $class: 'KubernetesEngineBuilder',
                    projectId: env.PROJECT_ID,
                    clusterName: env.CLUSTER_NAME,
                    location: env.LOCATION,
                    manifestPattern: 'adminpage-deploy.yaml',
                    credentialsId: env.CREDENTIALS_ID,
                    verifyDeployments: true])
                } 
            }
        }
    } 
}