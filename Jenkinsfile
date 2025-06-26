pipeline {
  agent any

  tools {
    nodejs 'NodeJS18' // ✅ Matches Global Tool name
  }

  environment {
    SONAR_SCANNER_HOME = tool 'SonarQube Scanner'
    SONAR_TOKEN = credentials('sqa_fe6e65a676ebc0205cce9f05419b3865367334c2')
  }

  stages {
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
