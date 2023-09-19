pipeline {
    agent none
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub_id')
    }
    stages {
         stage('Checkout'){
            agent any
            steps{
                //Changez avec votre lien github
                git branch: 'main', url: 'https://github.com/Arij-Abid/productionApp.git'
            }
        }
        stage('Init'){
            agent any
            steps{
            sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Build frontend') {
            agent any
            steps {
                dir('productionFrontapp'){
                    sh 'docker build -t arijabid/frontend:$BUILD_ID .'
                    sh 'docker push arijabid/frontend:$BUILD_ID'
                    sh 'docker rmi arijabid/frontend:$BUILD_ID'
                }
            }
        }
        stage('Build backend') {
            agent any
            steps {
                dir('gestionProductionCompany'){
                    sh 'docker build -t arijabid/backend:$BUILD_ID .'
                    sh 'docker push arijabid/backend:$BUILD_ID'
                    sh 'docker rmi arijabid/backend:$BUILD_ID'
                }
            }
        }

         stage('Cleanup'){
            agent any
            steps{
                sh 'docker logout'
            }
 
    }
}

}
