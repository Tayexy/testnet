pipeline {
  agent any

  tools {
    nodejs 'NodeJS 18' // Must match the exact name in Global Tool Configuration
  }

  environment {
    SONAR_SCANNER_HOME = tool 'SonarQube Scanner' // Must match the name in Global Tool Configuration
    SONAR_TOKEN = credentials('sqa_fe6e65a676ebc0205cce9f05419b3865367334c2') // Use with $SONAR_TOKEN
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/Tayexy/testnet.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('My SonarQube Server') {
          sh """
            ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
              -Dsonar.projectKey=testnet \
              -Dsonar.sources=. \
              -Dsonar.host.url=$SONARQUBE_URL \
              -Dsonar.login=$SONAR_TOKEN
          """
        }
      }
    }
  }
}
