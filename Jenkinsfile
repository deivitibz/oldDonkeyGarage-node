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
        sh 'docker build -t shanem/spring-petclinic:latest .'
      }
    }
  }
}