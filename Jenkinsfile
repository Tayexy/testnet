pipeline {
    agent any

    environment {
        GIT_TRACE_PACKET = '1'
        GIT_TRACE = '1'
        GIT_CURL_VERBOSE = '1'
        GIT_HTTP_LOW_SPEED_LIMIT = '0'
        GIT_HTTP_LOW_SPEED_TIME = '999999'
        GIT_HTTP_MAX_REQUEST_BUFFER = '1000000000'
    }

    options {
        timeout(time: 20, unit: 'MINUTES') // Prevents hanging
    }

    stages {
        stage('Clone') {
            steps {
                echo "Configuring Git and shallow cloning repository"
                bat 'git config --global http.postBuffer 524288000'
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/Tayexy/testnet.git']],
                    extensions: [[$class: 'CloneOption', shallow: true, depth: 1]]
                ])
            }
        }

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
                // Add deploy logic here
            }
        }
    }

    post {
        always {
            echo "Pipeline concluded."
        }

        success {
            echo "All stages executed with success."
            bat 'start npm start' // Non-blocking
        }

        failure {
            echo "Pipeline failed. Check logs for errors."
        }
    }
}
