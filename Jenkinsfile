pipeline {
   agent any
   stages {
      stage('e2e-tests') {
         steps {
            script {
               sh 'npm i'
               sh 'npx playwright install --with-deps'
               sh 'npm test'
            }
         }
      }
      stage('Allure') {
         steps {
            allure(
               [
                  includeProperties: false,
                  jdk: '',
                  properties:[],
                  reportBuildPolicy: 'ALWAYS',
                  results: [[path: 'allure-results']]
               ]
            )
         }
      }
   }
}
