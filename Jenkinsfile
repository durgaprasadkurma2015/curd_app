pipeline {

    agent any

    tools {
        maven 'Maven'
        nodejs 'NodeJS'
    }

    environment {

        // =========================
        // SONARCLOUD
        // =========================

        SONAR_PROJECT_KEY = 'curd_app'
        SONAR_ORG = 'durgaprasadkurma2015'

        // =========================
        // DOCKER
        // =========================

        DOCKER_HUB = 'durgaprasadkurma2015'

        BACKEND_IMAGE = 'curd-backend'
        FRONTEND_IMAGE = 'curd-frontend'

        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        // =========================
        // CHECKOUT CODE
        // =========================

        stage('Checkout Code') {

            steps {

                git branch: 'main',
                url: 'https://github.com/durgaprasadkurma2015/curd_app.git'
            }
        }

        // =========================
        // BUILD BACKEND
        // =========================

        stage('Build Backend') {

            steps {

                dir('backend') {

                    bat 'mvn clean package -DskipTests'
                }
            }
        }

        // =========================
        // SONARCLOUD ANALYSIS
        // =========================

        stage('SonarCloud Analysis') {

            steps {

                dir('backend') {

                    withCredentials([

                        string(
                            credentialsId: 'SonarqubeCloud-token',
                            variable: 'SONAR_TOKEN'
                        )
                    ]) {

                        bat """
                            mvn verify sonar:sonar ^
                            -Dsonar.projectKey=%SONAR_PROJECT_KEY% ^
                            -Dsonar.organization=%SONAR_ORG% ^
                            -Dsonar.host.url=https://sonarcloud.io ^
                            -Dsonar.token=%SONAR_TOKEN%
                        """
                    }
                }
            }
        }

        // =========================
        // BUILD FRONTEND
        // =========================

        stage('Build Frontend') {

            steps {

                dir('frontend') {

                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // =========================
        // DEPLOY TO NEXUS
        // =========================

        stage('Deploy to Nexus') {

            steps {

                dir('backend') {

                    withCredentials([

                        usernamePassword(
                            credentialsId: 'nexus-creds',
                            usernameVariable: 'NEXUS_USER',
                            passwordVariable: 'NEXUS_PASS'
                        )
                    ]) {

                        bat """
                            mvn deploy ^
                            -Dusername=%NEXUS_USER% ^
                            -Dpassword=%NEXUS_PASS%
                        """
                    }
                }
            }
        }


        stage('Test Docker') {
    steps {
        bat 'docker --version'
    }
}
        
        // =========================
        // DOCKER BUILD
        // =========================

        stage('Docker Build Images') {

            steps {

                dir('backend') {

                    bat """
                        docker build -t %DOCKER_HUB%/%BACKEND_IMAGE%:%IMAGE_TAG% .
                    """
                }

                dir('frontend') {

                    bat """
                        docker build -t %DOCKER_HUB%/%FRONTEND_IMAGE%:%IMAGE_TAG% .
                    """
                }
            }
        }

        // =========================
        // DOCKER LOGIN
        // =========================

        stage('Docker Login') {

            steps {

                withCredentials([

                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    bat """
                        docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                    """
                }
            }
        }

        // =========================
        // PUSH DOCKER IMAGES
        // =========================

        stage('Push Docker Images') {

            steps {

                bat """
                    docker push %DOCKER_HUB%/%BACKEND_IMAGE%:%IMAGE_TAG%
                """

                bat """
                    docker push %DOCKER_HUB%/%FRONTEND_IMAGE%:%IMAGE_TAG%
                """
            }
        }

        // =========================
        // KUBERNETES DEPLOYMENT
        // =========================

        stage('Deploy to Kubernetes') {

            steps {

                dir('k8s') {

                    bat 'kubectl apply -f backend/'
                    bat 'kubectl apply -f frontend/'
                }
            }
        }

        // =========================
        // ARCHIVE ARTIFACTS
        // =========================

        stage('Archive Artifacts') {

            steps {

                archiveArtifacts(
                    artifacts: '**/target/*.jar',
                    fingerprint: true
                )
            }
        }
    }

    // =========================
    // POST BUILD ACTIONS
    // =========================

    post {

        success {

            echo 'BUILD SUCCESS ✅'
        }

        failure {

            echo 'BUILD FAILED ❌ Check logs'
        }
    }
}
