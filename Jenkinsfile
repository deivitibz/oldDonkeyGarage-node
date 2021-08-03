pipeline {
  agent any
 
  tools {nodejs "node12"}
 
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }
        stage('Docker Build') {
      agent any
      steps {
        sh 'docker container rm nodeapp'
        sh 'docker build -t deivit/nodeapp .'
        sh 'docker run -d --name nodeapp deivit/nodeapp'
      }
    }
  }
}