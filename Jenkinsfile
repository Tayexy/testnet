pipeline {
  agent any

  tools {
    nodejs 'NodeJS18' // ✅ Matches Global Tool Configuration
  }

  environment {
    SONAR_SCANNER_HOME = tool 'SonarQube Scanner'
    SONAR_TOKEN = credentials('sqa_fe6e65a676ebc0205cce9f05419b3865367334c2')
  }

  stages {
    stage('Install Dependencies') {
      steps {
        bat 'npm install'
      }
    }

    stage('Build') {
      steps {
        bat 'npm run build'
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('My SonarQube Server') {
          bat """
            ${SONAR_SCANNER_HOME}\\bin\\sonar-scanner.bat ^
              -Dsonar.projectKey=testnet ^
              -Dsonar.sources=. ^
              -Dsonar.host.url=%SONARQUBE_URL% ^
              -Dsonar.login=%SONAR_TOKEN%
          """
        }
      }
    }
  }
}
