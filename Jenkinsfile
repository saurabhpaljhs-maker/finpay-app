pipeline {
  agent any
  
  environment {
    DOCKER_REGISTRY = 'docker.io'
    DOCKER_USERNAME = 'sauraabh'
    DOCKER_IMAGE_NAME = 'finpay-app'
    DOCKER_IMAGE_TAG = "${BUILD_NUMBER}"
    DOCKER_FULL_IMAGE = "${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
    GKE_CLUSTER = 'gke-cluster-2'
    GKE_ZONE = 'us-central1-a'
    GCP_PROJECT = 'project-a50884db-e699-490c-8e3'
    K8S_DEPLOYMENT = 'finpay-test'
    K8S_NAMESPACE = 'default'
  }
  
  stages {
    stage('Checkout') {
      steps {
        echo "Stage 1: Checkout"
        checkout scm
      }
    }
    
    stage('Build') {
      steps {
        echo "Stage 2: Build and Test"
        sh 'npm install'
      }
    }
    
    stage('Docker Build and Push') {
      steps {
        echo "Stage 3: Docker Build and Push"
        sh 'docker build -t ${DOCKER_FULL_IMAGE} .'
        withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh 'docker push ${DOCKER_FULL_IMAGE}'
          sh 'docker logout'
        }
      }
    }
    
    stage('Deploy') {
      steps {
        echo "Stage 4: Deploy to GKE"
        sh 'gcloud container clusters get-credentials ${GKE_CLUSTER} --zone=${GKE_ZONE} --project=${GCP_PROJECT}'
        sh 'kubectl set image deployment/${K8S_DEPLOYMENT} finpay=${DOCKER_FULL_IMAGE} -n ${K8S_NAMESPACE}'
        sh 'kubectl rollout status deployment/${K8S_DEPLOYMENT} -n ${K8S_NAMESPACE} --timeout=5m'
      }
    }
  }
  
  post {
    success {
      echo "Pipeline succeeded!"
    }
    failure {
      echo "Pipeline failed!"
    }
  }
}
