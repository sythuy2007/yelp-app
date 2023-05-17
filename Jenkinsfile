pipeline {
    agent { 
        node {
            label 'docker-agent-nodejs'
            }
      }
    stages {
		stage('Checkout') {
			steps {
				checkout scm
			}
		}
    }
    stage('Client Tests') {
	steps {
		dir('Yelp-client') {
			sh 'npm install'
			sh 'npm run test'
		}
	}
}
stage('Server Tests') {
	steps {
		dir('server') {
			sh 'npm install'
			sh 'npm run test'
		}
	}
}
    stage('Build Images') {
	steps {
		sh 'docker build -t rakeshpotnuru/productivity-app:client-latest client'
		sh 'docker build -t rakeshpotnuru/productivity-app:server-latest server'
	}
}
}
