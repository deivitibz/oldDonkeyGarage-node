pipeline {
  agent any

  tools {nodejs "node"}

  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/deivitibz/oldDonkeyGarage-node.git'
      }
    }
    stage('Install dependencies') {
      steps {
        sh 'npm i -save express http-errors jsonwebtoken mongoose morgan nodemon dotenv moment sequelize'
      }
    }
    stage('Test') {
      steps {
         sh 'node ./bin/www'
      }
    }
  }
}
