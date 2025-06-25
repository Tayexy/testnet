pipeline {
  agent any

  tools {
    nodejs 'NodeJS 18' // Make sure NodeJS is configured in Jenkins under Global Tools
  }

  environment {
    SONAR_SCANNER_HOME = tool 'SonarQube Scanner' // Name must match what you configure in Jenkins
    SONAR_TOKEN = credentials('sqa_fe6e65a676ebc0205cce9f05419b3865367334c2') // Store your Sonar token in Jenkins Credentials
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
          sh "${SONAR_SCANNER_HOME}/bin/sonar-scanner -Dsonar.login=${sqa_fe6e65a676ebc0205cce9f05419b3865367334c2}"
        }
      }
    }
  }
}
