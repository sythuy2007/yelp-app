pipeline {
    agent { 
        node {
            label 'docker-agent-node'
            }
}
    triggers {
        pollSCM 'H/5 * * * *'
    }
    stages {
		stage ('Checkout') {
			steps {
				checkout scm
			}
		}

        stage ('Client Tests') {
                steps {
                    dir('Yelp-client') {
                        sh 'npm install'
                        sh 'npm run test'
                }
            }
        }
        stage ('Server Tests') {
                steps {
                    dir('Yelp-server') {
                        sh 'npm install'
                        sh 'npm run test'
                    }
            }
        }
        stage ('Build Images') {
                steps {
                    sh 'docker build -t sythuy2007/yelp-client:latest client'
                    sh 'docker build -t sythuy2007/yelp-server:latest server'
            }
        }   
}
}

