# New App Setup Procedure
It's important to hit the ground running when starting a new project. To do that we use a checklist and make as few decisions as possible. We love trying new things but the first week of a new project is not the time for that.

This assumes the discovery week has already happened.


## Production and staging apps
Use Heroku or Galaxy, based on project requirements, for hosting Meteor apps. This guide provides instructions for setting up either.


## Setting Up
TODO: Split the high-level sections into their own documents.

### App Project
Begin you new application by following the steps with the OKGROW! [`starter-kit`](https://github.com/okgrow/starter-kit).


### Heroku

1. Add the Logentries Slack integration to the project's Slack channel
  1. Go to the project's Slack channel and, under "Channel Settings" click "Add an app or integration"
  1. Add Logentries as an integration and copy the web hook URL; save the integration

#### Staging
1. Create staging Heroku app using the [create-heroku-app](../../scripts/create-heroku-app) script. NOTE: You'll want to specify "-staging" in the name.
1. Add other team members as collaborators on the app under the "Access" section.
  1. Add accounts+semaphoredeploy@okgrow.com as a collaborator.
1. For meteor projects use [our fork of the "horse" buildpack](https://github.com/okgrow/meteor-buildpack-horse.git)
1. Configure the Logentries add-on in Heroku
  1. Disable some notifications which get triggered by every web socket connection:
    1. High response time
    1. Connection closed w/o response
    1. Idle connection
  1. Disable email for all notifications and add the Slack web hook URL
    * **NOTE** This is a process that involves editing each notification. (TODO: details)
1. Add the mLab MongoDB add on.
  1. TODO: details

#### Production
1. Create staging Heroku app using the [create-heroku-app](../../scripts/create-heroku-app) script. NOTE: You'll want to specify "-production" in the name.
1. Add other team members as collaborators on the app under the "Access" section.
  1. Add accounts+semaphoredeploy@okgrow.com as a collaborator.
1. For meteor projects use [our fork of the "horse" buildpack](https://github.com/okgrow/meteor-buildpack-horse.git)
  1. Configure the Logentries add-on in Heroku
    1. Disable some notifications which get triggered by every web socket connection:
      1. High response time
      1. Connection closed w/o response
      1. Idle connection
    1. Disable email for all notifications and add the Slack web hook URL
      * **NOTE** This is a process that involves editing each notification. (TODO: details)
  1. Configure Mailgun add-on
    1. Add DNS records (TODO: more details)
    1. Edit `MAILGUN_*` env vars to contain the info for the verified domain (instead of the sandbox domain).
  1. ???? If you are configuring dynos Heroku requires a `Procfile` where you specify the startup process commands. Here is a basic meteor example [Procfile](procfile-example)
1. Add the Compose MongoDB add on.
  1. TODO: details
  1. Create read-only user for production DB

#### Database Information Document
Create a new spreadsheet in the project's "Development" folder on the Google Drive and record the database information from both staging and production databases.


### Galaxy
TODO: details


#### MongoDB Atlas
MongoDB Atlas is the recommended database hosting provider. If you have an account, it will take  about 5 minutes to setup. Detailed step-by-step instructions for getting setup and started can be found in our ["MongoDB Atlas Setup" blog post](https://www.okgrow.com/posts/mongodb-atlas-setup).



### AWS (optional)
**NOTE** Not all apps require AWS, so this section is optional.

1. Set up AWS account
  1. Client creates root account and gives us temporary password
  1. Set custom IAM login domain
  1. Create IAM user for each developer
    1. Add 2-factor auth (MFA)
    1. Attach AdministratorAccess policy
    1. Ask client to change root account password and add MFA
1. Create AWS Route 53 Health Check with alert for the production hostname (not the \*.herokuapp.com hostname)
  1. Add ?ping=aws to monitoring URL
  1. Set up string matching for something that appears in the beginning of the page, e.g. the title. (NOTE: it needs to be in the first few hundred bytes).
  1. Set up alert notification to &lt;project&gt;@okgrow.com
1. Create S3 buckets
  1. Production
    1. Create production S3 bucket named &lt;app-name&gt;-app-production
      1. Add [public-read bucket policy](s3-bucket-public-read-policy.json)
    1. Create production IAM user with access only to production S3 bucket
      1. [Add policy](app-iam-user-policy.json)
      1. Ensure the user has API credentials, no password
    1. Set METEOR_SETTINGS env var on production app in same format as [default settings.json.example file](https://drive.google.com/open?id=0B4JoTt-NyIq5WUtWOFlkSDlXT2s) (but with line-ends removed)
  1. Staging
      1. Create staging S3 bucket named &lt;app-name&gt;-app-staging
        1. Add [public-read bucket policy](s3-bucket-public-read-policy.json)
      1. Create staging IAM user with access only to staging S3 bucket
        1. [Add policy](app-iam-user-policy.json)
        1. Ensure the user has API credentials, no password
      1. Set AWS config env vars on staging app



### Error Logging
We are using [Sentry.io](https://sentry.io) for error tracking and reporting. You can sign into sentry using single sign on with your gmail account.

Depending on the project, you may create a new organisation for the project or create a new project under the existing OK GROW! organisation. Creating a new organisation is mainly for billing purposes and managing users outside of OK GROW!.

#### Create a New Organisation:
1. Log in.
1. Click the icon in the top left hand corner.
2. Select "New Organization" then follow the prompts.
1. You should now have an organisation and one project, you will now need to add anyone one the project to the organisation.
1. Navigate to the organisation's settings page and select "Members".
  * Click "Invite Member" in the top right hand corner.
1. Setup billing & usage, this will be with OK GROWS! credit card or the client's.

#### Create Projects:
1. Every app we build will need to have at least two projects to track errors. e.g - a staging and production project. The recommended syntax for a projects name is `myproject-staging` and `myproject-production`.
1. Navigate to the organisations dashboard, in the top right select "New Project".
1. Follow the prompts and setup the project.
1. Navigate to the "Project Settings" and set the following fields:
  1. Email: Subject Prefix to the projects name.
  1. Event Settings: Default environment to staging or production.
  1. The Project Name & Short Name should be the same.
  1. The Team should be the Team for the organisation the project belongs to. If the project is under OK GROW! then set it to OK GROW!
1. Next navigate to All Integrations and add the following:
  1. Github - Optional
  1. Slack - Mandatory
  1. Trello - Recommended
1. Once these integrations have been added you will need to set them up.
  1. Github - (Optional) Follow instructions to setup.
  1. Slack - You will need to go to [here](https://okgrow.slack.com/apps/A0F814BEV-sentry) and select "Add Configuration", and follow the prompts. Add a descripitive label to state what project the error logging is for. Save the settings and copy the Webhook URL and add it to the sentry website. You can use the same URL for both staging & production.
  1. Trello - Follow these [instructions](https://github.com/damianzaremba/sentry-trello/blob/master/HOW_TO_SETUP.md) to get the API key & token. Once the keys have been saved you will need to add the Trello Organization where the Trello Board exists. Note these keys are associated with your Trello user account.
1. Next navigate to "Alerts" and select "Rules".
  1. Now you will need to select "Edit Rule"
  1. Delete the two default rule & action.
  1. Now add the rule "An event is seen".
  1. Next add the "Send a notification via [service]", once added you can select to add Slack.
  1. You should have this Alert Rule "An event is seen" and "Send a notification via Slack".
  1. Now save this rule :)

#### Meteor App Setup
1. All you have to do is have used our base meteor app to get started.
1. You will need to add the DSN and Public DSN from your sentry.io projects to your meteor settings for staging and production.

#### Exponent - React-Native setup
1. TODO: This will need to be updated once we have a build script completed.
1. Currently you can follow the steps taken for the Rapunzl project. (TODO: details)



### Continuous Integration

#### AWS Configuration (optional):
1. Create IAM user with read-only access to the production S3 bucket and read/write access to the staging S3 bucket:
    1. [Add Policy](https://drive.google.com/open?id=0B4JoTt-NyIq5Y2RuYjZPTFAwd0U)
    2. Ensure the user has API credentials and no password


#### Semaphore

##### Project
1. Create a new project in Semaphore
  1. **NOTE** Currently, Paul needs to do this step. Will fix.
1. Login to your Semaphore account (if you haven't been added to OK GROW!'s account, ask to be added.)
1. Select your project (listed as **okgrow / [project-name]**)
1. Edit project Settings by clicking "Project settings":
  1. **Build Settings**
    1. Set the "Node.js version" to "node.js 4.8.0" (TODO: Newer version?)
    1. Add these lines under setup:
      1. `cd web`
      1. `curl https://install.meteor.com/ | sh`
      1. `meteor --version`
      1. `meteor npm install`
      1. `cp /home/runner/seam/settings.json settings.json`
      1. **FUTURE** `meteor npm start`
        * **NOTE** add instructions to listen for success and exit process
    1. Rename "Job #1" to "Tests"
    1. Add: `meteor npm run test`
        * **NOTE** We need to add this to `starter-kit`
  1. **Environment Variables**
    1. Add these variables (you'll get the values for these from the "Database Information" document created above):
        * `PRODUCTION_DB_HOST`
        * `PRODUCTION_DB_PORT`
        * `PRODUCTION_DB_NAME`
        * `PRODUCTION_DB_USERNAME`
        * `PRODUCTION_DB_PASSWORD`
        * `STAGING_DB_HOST`
        * `STAGING_DB_PORT`
        * `STAGING_DB_NAME`
        * `STAGING_DB_USERNAME`
        * `STAGING_DB_PASSWORD`
        * `AWS_ACCESS_KEY_ID` (optional)
        * `AWS_SECRET_ACCESS_KEY` (optional)
        * `APPNAME` (optional - used on AWS setup)
  1. **Configuration Files**
    1. Add the application's `settings.json` file


##### Staging Server
On the Semaphore project page click “Set Up Deployment”.

1. Select "Heroku":
  1. Select "Automatic"
  1. Select the "master" branch
1. Enter the API key for the `accounts+semaphoredeploy@okgrow.com` Heroku user (from [here](https://docs.google.com/spreadsheets/d/1Uu0dUzbRKGMqAkbelLbpGpIHx3yjTeHwB1dgf7dZqyk/edit#gid=0))
1. Select the Staging Heroku app for this project from the list; name the server “Staging”
1. On the Semaphore project page, under "Servers", click the server name (e.g., "Staging")
1. On the servers screen, click the "Edit Server" button
1. Under "Deploy commands" click the "Change deploy commands" link and paste the contents from [staging app deploy config](semaphore-staging-deploy-config)


##### Production Server
On the Semaphore project page click the + button beside "Servers" to add a new server.

1. Select "Heroku":
  1. Select "Automatic"
  1. Select the "master" branch
1. Enter the API key for the `accounts+semaphoredeploy@okgrow.com` Heroku user (from [here](https://docs.google.com/spreadsheets/d/1Uu0dUzbRKGMqAkbelLbpGpIHx3yjTeHwB1dgf7dZqyk/edit#gid=0))
1. Select the Production Heroku app for this project from the list; name the server “Production”
1. On the Semaphore project page, under "Servers", click the server name (e.g., "Production")
1. On the servers screen, click the "Edit Server" button
1. Under "Deploy commands" click the "Change deploy commands" link and paste the contents from [production app deploy config](semaphore-production-deploy-config).


#### Slack Integration
1. Go to the project's Slack channel and, under "Channel Settings" click "Add an app or integration"
1. Add Sempahore as an integration and copy the web hook URL; save the integration
1. On Semaphore, go to Project Settings / Notifications / Webhooks
1. Add the web hook URL and select "Build and Deploy" from the "Receive After" dropdown
