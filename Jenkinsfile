pipeline {
    agent any

    tools {
        maven 'Maven3'
        nodejs 'NodeJS'
    }

    stages {

        stage('Clone Code') {
            steps {
                echo "Cloning code..."
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Run Application') {
            steps {
                sh 'java -jar backend/target/*.jar &'
            }
        }
    }
}