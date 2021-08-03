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
        sh 'docker build -t deivit/nodeapp .'
      }
    }
    stage('Docker Stop Container') {
      agent any
      steps {
        sh 'docker container stop nodeapp'
      }
    }
    stage('Docker Delete Container') {
      agent any
      steps {
        sh 'docker container rm nodeapp'
      }
    }
    stage('Deploy') {
      agent any
      steps {
        sh 'docker run -d --name nodeapp deivit/nodeapp'
      }
    }
  }
}