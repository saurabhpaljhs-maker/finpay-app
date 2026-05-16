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
    stage('Stage 1: Checkout') {
      steps {
        echo "=========================================="
        echo "Stage 1: Checking out code from GitHub"
        echo "=========================================="
        checkout scm
      }
    }
    
    stage('Stage 2: Build & Test') {