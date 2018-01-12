---
id: new-app-setup-continuous-integration
title: Continuous Integration - Checklist
---

## Semaphore

### Project

1. Create a new project in Semaphore
   * **NOTE** Currently, Paul needs to do this step. Will fix.
1. Login to your Semaphore account (if you haven't been added to OK GROW!'s account, ask to be added.)
1. Select your project (listed as **okgrow / [project-name]**)
1. Edit project Settings by clicking "Project settings":
   1. **Build Settings**
      1. Set the "Node.js version" to "node.js 7.10.1" (or later)
      1. Add these lines under setup: [Semaphore build settings](semaphore-build-settings)
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

### Staging Server

On the Semaphore project page click “Set Up Deployment”.

1. Select "Heroku":
   1. Select "Automatic"
   1. Select the "master" branch
1. Enter the API key for the `accounts+semaphoredeploy@okgrow.com` Heroku user (from [here](https://docs.google.com/spreadsheets/d/1Uu0dUzbRKGMqAkbelLbpGpIHx3yjTeHwB1dgf7dZqyk/edit#gid=0))
1. Select the Staging Heroku app for this project from the list; name the server “Staging”
1. On the Semaphore project page, under "Servers", click the server name (e.g., "Staging")
1. On the servers screen, click the "Edit Server" button
1. Under "Deploy commands" click the "Change deploy commands" link and paste the contents from [staging app deploy config](semaphore-staging-deploy-config)

### Production Server

On the Semaphore project page click the + button beside "Servers" to add a new server.

1. Select "Heroku":
   1. Select "Automatic"
   1. Select the "master" branch
1. Enter the API key for the `accounts+semaphoredeploy@okgrow.com` Heroku user (from [here](https://docs.google.com/spreadsheets/d/1Uu0dUzbRKGMqAkbelLbpGpIHx3yjTeHwB1dgf7dZqyk/edit#gid=0))
1. Select the Production Heroku app for this project from the list; name the server “Production”
1. On the Semaphore project page, under "Servers", click the server name (e.g., "Production")
1. On the servers screen, click the "Edit Server" button
1. Under "Deploy commands" click the "Change deploy commands" link and paste the contents from [production app deploy config](semaphore-production-deploy-config).

## Slack Integration

1. Go to the project's Slack channel and, under "Channel Settings" click "Add an app or integration"
1. Add Sempahore as an integration and copy the web hook URL; save the integration
1. On Semaphore, go to Project Settings / Notifications / Webhooks
1. # Add the web hook URL and select "Build and Deploy" from the "Receive After" dropdown
1. Currently you can follow the steps taken for the Rapunzl project.

## MongoDB Atlas

If the project is using Galaxy to host the app the MongoDB Atlas is the recommended hosting provider. If you already have an account it will take you about 5 mins to setup. You can find detailed step-by-step instructions to getting setup and started in our blog post [here](https://www.okgrow.com/posts/mongodb-atlas-setup).

Atlas is the best option if wishing to scale CPU & Memory independently to it's storage & disk I/O, cheapest for using the WiredTiger Storage engine, encrypting data at rest, have 3 to 7 data bearing nodes, continuous backups & snapshots.

## MongoDB create users:

1. Create read-only user for production DB
2. Create user on staging DB (not read-only)

## Semaphore config:

1. Create new project
   1. NOTE: Paul needs to do this step currently. Will fix...
1. Edit Build Settings:
   1. Go to [https://semaphoreci.com/okgrow/](https://semaphoreci.com/okgrow/)&lt;PROJECT_NAME&gt;/settings
   1. Set the Node version to node.js 7.10.1 (or later)
   1. Add these lines under setup: [Semaphore build settings](semaphore-build-settings)
   1. Note: You may also need to add more project specific steps.
1. Edit Project Settings:
   1. Under "Configuration Files" add the project's `settings.json` file.
   1. Under "Configuration Files" add the project's `app-production.json` file.
   1. Under "Configuration Files" add the project's `app-staging.json` file.
   1. Under "Branches" change the cancellation strategy to "queued and started builds".
1. On the Sempahore project homepage click “Set Up Deployment” (staging)
   1. Choose Heroku, then automatic, and then master.
   1. Enter the API key for the [accounts+semaphoredeploy@okgrow.com](mailto:accounts+semaphoredeploy@okgrow.com) Heroku user.
   1. Select the Staging Heroku app for this project from the list, and name it “Staging”.
   1. Add the [staging app deploy config](semaphore-staging-deploy-config)
1. Add a new server by clicking the + button beside 'Servers' (production)
   1. Choose Heroku, then manual, and then master.
   1. Enter the API key for the [accounts+semaphoredeploy@okgrow.com](mailto:accounts+semaphoredeploy@okgrow.com) Heroku user, check our Accounts.
   1. Select the Production Heroku app for this project from the list, and name it “Production”
   1. Add the [production app deploy config](semaphore-production-deploy-config)
1. Add Slack notifications (no email)
   1. Go to the project's slack channel and add an integration
   1. Add sempahore as an integration and make note of the webhook URL, then save the integration
   1. Go to Project Settings / Notifications / Webhooks in Semaphore
   1. Add the webhook URl and select 'Build and Deploy' from the 'Receive After' dropdown

## Heroku config

1. In Heroku: Under ‘Access’, add [accounts+semaphoredeploy@okgrow.com](mailto:accounts+semaphoredeploy@okgrow.com) as a collaborator in the staging and production Heroku app

## AWS Configuration

> This section is optional

1. Create IAM user with read-only access to the production S3 bucket and read/write access to the staging S3 bucket:
   1. [Add Policy](semaphore-iam-user-policy.json)
   1. Ensure the user has API credentials and no password
