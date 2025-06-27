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

    stage('Cleanup') {
      steps {
        echo 'Cleaning workspace and old node_modules...'
        bat 'rmdir /s /q node_modules'
        bat 'rmdir /s /q build' // If build folder exists
      }
    }

    stage('Configure NPM') {
      steps {
        echo 'Configuring npm registry and proxy (if needed)...'
        bat 'npm config set registry https://registry.npmjs.org/'

        // If behind a proxy, uncomment and update the following:
        // bat 'npm config set proxy http://your.proxy.address:port'
        // bat 'npm config set https-proxy http://your.proxy.address:port'

        // Optional: verify applied settings
        bat 'npm config list'
      }
    }

    stage('Install Dependencies') {
      steps {
        echo 'Installing dependencies with --no-cache and retry logic...'
        script {
          retry(2) { // Retry up to 2 times on failure
            bat 'npm install --no-cache'
          }
        }
      }
    }

    stage('Build') {
      steps {
        echo 'Running build script...'
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
