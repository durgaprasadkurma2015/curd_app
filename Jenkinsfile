pipeline {
    agent any

    tools {
        maven 'Maven3'
        nodejs 'NodeJS'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/durgaprasadkurma2015/curd_app.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Verify Backend Build') {
            steps {
                bat 'dir backend\\target'
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

        stage('Archive Build (Optional)') {
            steps {
                archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
            }
        }

    }

    post {
        success {
            echo "BUILD SUCCESS ✅"
        }
        failure {
            echo "BUILD FAILED ❌ Check logs"
        }
    }
}