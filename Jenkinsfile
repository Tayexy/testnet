pipeline {
    agent any

    stages {
        stage('Build') { 
            steps {
                echo "Building stage"
                bat 'node -v' 
                bat 'npm install' 
            }
        }

        stage('Test') { 
            steps {
                echo "Testing stage"
                bat 'npm test'
            }
        }

        stage('Deploy') { 
            steps {
                echo "Deploying..."
                // You can add your deploy steps here
            }
        }
    }

    post {
        always {
            echo "Pipeline concluded."
        }

        success {
            echo "All stages executed with success."
            bat 'npm start'
        }

        failure {
            echo "Pipeline failed. Check logs for errors."
        }
    }
}
