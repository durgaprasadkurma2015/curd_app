pipeline {
    agent any

    tools {
        maven 'Maven3'
        nodejs 'NodeJS'
    }

    environment {
        SONAR_PROJECT_KEY = 'curd_app'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/durgaprasadkurma2015/curd_app.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                   bat 'mvn clean install -DskipTests'
                }
            }
        }

      stage('Build + SonarQube Analysis') {
    steps {
        dir('backend') {
            withSonarQubeEnv('SonarQube') {
                withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                    bat """
                        mvn clean verify sonar:sonar ^
                        -Dsonar.projectKey=curd_app ^
                        -Dsonar.host.url=http://localhost:9000 ^
                        -Dsonar.token=%SONAR_TOKEN%
                    """
                }
				waitForQualityGate()
            }
        }
    }
}

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'BUILD SUCCESS ✅'
        }
        failure {
            echo 'BUILD FAILED ❌- Check logs'
        }
    }
}