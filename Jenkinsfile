pipeline {
    agent any

    environment {
        // Git download tuning
        GIT_TRACE_PACKET = '1'
        GIT_TRACE = '1'
        GIT_CURL_VERBOSE = '1'
        GIT_HTTP_LOW_SPEED_LIMIT = '0'
        GIT_HTTP_LOW_SPEED_TIME = '999999'
        GIT_HTTP_MAX_REQUEST_BUFFER = '1000000000'
    }

    options {
        timeout(time: 20, unit: 'MINUTES') // Prevent pipeline from hanging forever
    }

    stages {
        stage('Clone') {
            steps {
                echo "🔄 Cloning repository (shallow)..."
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
                echo "⚙️ Running npm install..."
                bat 'node -v'
                bat 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo "🧪 Running test suite..."
                bat 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                echo "🚀 Deploy stage - add deployment logic here."
            }
        }
    }

    post {
        always {
            echo "✅ Pipeline concluded."
        }

        success {
            echo "🎉 Build and tests successful."
            bat 'start npm start' // Non-blocking start
        }

        failure {
            echo "❌ Pipeline failed. Check error logs above."
        }
    }
}
