pipeline {
   agent any
   stages {
      stage('e2e-tests') {
        nodejs('NodeJS2290'){
         steps {
            sh 'npm i'
            sh 'npx playwright install --with-deps'
            sh 'npm test'
         }
        
      }
   }
}
