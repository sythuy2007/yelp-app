pipeline {
    agent none        
    triggers {
        pollSCM 'H/5 * * * *'
    }
    stages {
		stage ('Checkout') {
            agent { label 'docker-agent-node' }
			steps {
				checkout scm
			}
		}

        stage ('Client Tests') {
            agent { label 'docker-agent-node' }
                steps {
                    dir('Yelp-client') {
                        sh 'npm install'
                        sh 'npm run test'
                }
            }
        }
        stage ('Server Tests') {
            agent { label 'docker-agent-node' }
                steps {
                    dir('Yelp-server') {
                        sh 'npm install'
                        sh 'npm run test'
                    }
            }
        }
        stage ('Build Images') {
            agent { label 'docker-agent-docker' }
                steps {
                    sh 'docker build -t sythuy2007/yelp-client:latest client'
                    sh 'docker build -t sythuy2007/yelp-server:latest server'
            }
        }   
}
}

