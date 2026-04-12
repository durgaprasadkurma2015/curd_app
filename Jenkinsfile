pipeline {
    agent any

    tools {
        maven 'Maven3'
        nodejs 'NodeJS'
    }

    stages {

        stage('Build Backend') {
            steps {
                dir('backend') {
                    bat 'mvn clean install'
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

        stage('Run Application') {
            steps {
                bat 'java -jar backend\\target\\*.jar'
            }
        }
    }
}