CI & Auto Deployment Setup
==========

AWS config:
  1. Create IAM user with read-only access to production S3 bucket and read/write access  to staging S3 bucket
      * Add policy
      * Ensure the user has API credentials, no password

MongoLab create users:
  1. Create read-only user for production DB
  1. Create user on staging DB (not read-only)

Semaphore config:
  1. Create new project
      * NOTE: Paul needs to do this step currently. Will fix...
  1. Edit build settings:
      * Go to https://semaphoreci.com/okgrow/<PROJECT_NAME>/settings
      * Set the Node version to node.js 0.12
      * add each of these lines under setup
```
curl -o meteor_install_script.sh https://install.meteor.com/
chmod +x meteor_install_script.sh
sed -i "s/type sudo >\/dev\/null 2>&1/\ false /g" meteor_install_script.sh
./meteor_install_script.sh
export PATH=$PATH:~/.meteor/
meteor --version
git submodule init
git submodule update
cp settings.json.example settings.json
```
      * add the test runner under thread
          * TODO
  1. In Meteor Accounts: add accountssemaphoredeploy user as a collaborator the client organization
  1. Select master as the branch you want to build from
  1. Select the staging app for this project from the list, and name it “Project Name Staging”
  1. Set up deployment:
      * Click the “Set Up Deployment” button on the main page for the project
      * Select Generic Deploy, then Automatic
      * Select master as the branch to deploy
      * Select the staging app

Add these deploy steps
```
# test settings file exists
cat /home/runner/staging.json
#install meteor
curl -o meteor_install_script.sh https://install.meteor.com/
chmod +x meteor_install_script.sh
sed -i "s/type sudo >\/dev\/null 2>&1/\ false /g" meteor_install_script.sh
./meteor_install_script.sh
export PATH=$PATH:~/.meteor/
meteor --version
echo -e 'okgrowsemaphoredeploy\nLkvlBobip5sgAKyj\n' | meteor login
# install stuff
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
./awscli-bundle/install -b ~/bin/aws
# Copy production DB & S3 data to staging
mongodump -h XXXX.mongolab.com:XXXX -d heroku_XXXX -u backup -p XXXX -o mongodump
mongorestore -h XXXX.mongolab.com:XXXX -d heroku_XXXX -u backup -p XXXX mongodump/*
export AWS_ACCESS_KEY_ID=XXXX # Semaphore IAM user credentials
export AWS_SECRET_ACCESS_KEY=XXXX
~/bin/aws s3 sync s3://XXXX-app-production s3://XXXX-app-staging
# Deploy
DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy [APP NAME]-staging --settings staging.json
```

1. Add Slack notifications (no email)
  * All deploys
  * When builds change status

See also http://www.okgrow.com/posts/2013/10/08/ci-deployment-process/

