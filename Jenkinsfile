pipeline {
   agent any
   stages {
      stage('e2e-tests') {
        steps {
           nodejs('NodeJS2290'){
            sh 'npm i'
            sh 'npx playwright install --with-deps'
            sh 'npm test'
         }
        }
      }
   }
}
