pipeline {
  agent any
 
  tools {nodejs "node12"}
 
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
  }
  stage('Build and push docker image') {
    steps {
        script {
            def dockerImage = docker.build("antonml/node-demo:master")
            docker.withRegistry('', 'docker') {
                dockerImage.push('develop')
            }
        }
    }
}
}