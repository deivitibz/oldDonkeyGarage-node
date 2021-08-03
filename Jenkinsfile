pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'nodejs', configId: '<config-file-provider-id>') {
                    sh 'npm config ls'
                }
            }
        }
    }
}