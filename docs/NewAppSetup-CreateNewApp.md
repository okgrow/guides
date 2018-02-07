---
id: new-app-setup-create-new-app
title: Create New App - Procedure
---

**NOTE:** This procedure assumes Discovery Week is complete.

To hit the ground running on a new project we use a standard procedure and make as few ad-hoc decisions as possible. We love trying new things but the first week of a new project is not the time for that. This document is that procedure.


## Setup Base App (`starter-kit`)
Start a new application by following the steps in the OK GROW! [`starter-kit`](https://github.com/okgrow/starter-kit).


## Setup Application Servers (Heroku)

### Logentries Slack Integration
Add the Logentries Slack integration to the project's Slack channel:

1. In the project's Slack channel, click "Add an app" under "Channel Settings"
1. Add the Logentries integration
1. Copy the web hook URL
1. Save the integration

## ??? - Setup Database Server (MongoDB Atlas)
MongoDB Atlas is the recommended database hosting provider. If you have an account, it will take about 5 minutes to setup. Detailed step-by-step instructions for getting setup and started can be found in our ["MongoDB Atlas Setup" blog post](https://www.okgrow.com/posts/mongodb-atlas-setup).

### Create Client Orginsation Steps
1. Login to Atlas using your OK GROW! account. If you don't have one create one and setup your 2fa.
1. Go to Account Settings -> Organizations (top right corner, drop down menu on your username & select Organizations) or use this [url](https://cloud.mongodb.com/v2#/account/organizations)
1. Create a new Organization
1. Provide the name of the organization & select MongoDB Atlas
1. Provide email address for the members you wish to invite to the org (client & team mates)
1. Left hand side under Organization go to Settings -> then select Payment Method. (You can add the credit card info for the org or ask the client to enter themselves)
1. Left hand side under Organization go to Projects -> then select New Project & enter the name of the project & invite the users you want to the project

### Create and Setup Staging and Production DBs
1. Now Create the Projects Clusters (MongoDB nodes/db) for both staging & production by selecting Build a New Cluster.
1. Suggested names for the clusters can projectName-production & projectName-staging
1. Set the MongoDB Version that Meteor currently supports (3.4, soon will be 3.6)
1. Cloud Provider & Region should be set the same as where your app server will be located
1. Select the Instance size.
    1. Staging can most likely get away with the Free M0, or the cheap M2 ($9per month), M5 ($25 per month)
    1. Production should be at least the M10  instance
    1. Decide if you want to encrypt the storage volumes. It's a trade off between perf & security. Depending on your application this isn’t always a necessary requirement, unless you plan on storing confidential data unencrypted in the DB (which you shouldn't ever do).
    1. Enable Backup on only the Production Cluster
    1. Set the admin username & password (use the autogen secure password button) & record this somewhere safely to use for connecting to any of your clusters in the project.
1. For a more detailed walkthrough of these next steps, check the ["MongoDB Atlas Setup" blog post](https://www.okgrow.com/posts/mongodb-atlas-setup).
1. Security IP Whitelisting or AWS Peering
      1. You will need to create a whitelist of IP addresses that you wish to allow the db to receive connections from.
      1. The quick alternative until semaphore supports IP addresses is to select the option to whitelist all addresses e.g -> `0.0.0.0/0`
1. Create the Meteor User (This user will be used for the `"MONGO_URL"`)
    1. Select: “Create new user”.
    1. Set the “User Name”.
    1. Select “Read/Write any Database”.
    1. Create a password and save it! We need it for our MongoDB connection url for our Apps Environment variables.
 1. Create the Oplog User (This user will be used for the `"MONGO_OPLOG_URL"`)
    1. Select: “Create new user”.
    1. Click “advanced”.
    1. Set access to “read” @ “local”.
    1. Create a password and save it! We need it for our Meteor Oplog connection url for our Apps Environment variables.
 1. Create a backup & read only user [Optional]
   1. Select: `“Create new user”`.
    1. Click `“advanced”`.
    1. Set access to `“backup” @ “anyDatabases”`.
    1. Set access to `“read” @ “anyDatabases”`.
    1. Create a password and save it! We can use this for reading/completing a backup from MongoDB.


1. Create a read-write user on the staging DB:
    1. TODO: details
1. Create a read-only user on the production DB:
    1. TODO: details

### ??? - Database Information Document
Create a "database information" spreadsheet in the project's Google Drive "Development" with the database details for the staging and production databases.

### Heroku Team
1. Login to Heroku
1. In the "Personal" menu in the upper left, select "+ New Team"
    1. Give the team a name
    1. Enter the client's credit card information
    1. Click "Create Team"

### Staging
1. Run the [`create-heroku-app <app-name>-staging staging <heroku-team-name>`](https://github.com/okgrow/guides/blob/master/scripts/create-heroku-app) script from within the app project folder
1. Login to Heroku
1. Invite the client as a member for the app in the "Access" section
1. Add team members as collaborators on the app in the "Access" section
1. Set the `METEOR_SETTINGS` "config variable" in "Settings" in same format as the default `settings.json.example` file but with line-ends removed
1. Set the `MONGO_URL` "config variable" in "Settings"
1. Set the `ERROR_PAGE_URL` "config variable" in "Settings" to `https://s3.amazonaws.com/<app-name>-app-staging/maintenance.html` (**NOTE:** This will be setup below.)
1. Set the `MAINTENANCE_PAGE_URL` "config variable" in "Settings" to `https://s3.amazonaws.com/<app-name>-app-staging/maintenance.html` (**NOTE:** This will be setup below.)
1. Configure the Heroku Logentries add-on:
    1. Disable these notifications:
        - High response time
        - Connection closed w/o response
        - Idle connection
    1. Disable email and add the Slack web hook URL for all notifications:
        1. Click edit for the tag
        1. Under the "Add an Alert" section, uncheck email
        1. Select Slack (under "Other Options")
        1. Paste the webhook URL, the save changes

### Production
1. Run the [`create-heroku-app <app-name>-production production <heroku-team-name>`](https://github.com/okgrow/guides/blob/master/scripts/create-heroku-app) script from within the app project folder
1. Invite the client as a member for the app in the "Access" section
1. Add team members as collaborators on the app in the "Access"
1. Set the `METEOR_SETTINGS` "config variable" in "Settings" in same format as the default `settings.json.example` file but with line-ends removed
1. Set the `MONGO_URL` "config variable" in "Settings"
1. Set the `ERROR_PAGE_URL` "config variable" in "Settings" to `https://s3.amazonaws.com/<app-name>-app-production/error.html` (**NOTE:** This will be setup below.)
1. Set the `MAINTENANCE_PAGE_URL` "config variable" in "Settings" to `https://s3.amazonaws.com/<app-name>-app-production/maintenance.html` (**NOTE:** This will be setup below.)
1. Configure the Heroku Logentries add-on:
    1. Disable these notifications:
        - High response time
        - Connection closed w/o response
        - Idle connection
    1. Disable email and add the Slack web hook URL for all notifications:
        1. Click edit for the tag
        1. Under the "Add an Alert" section, uncheck email
        1. Select Slack (under "Other Options")
        1. Paste the webhook URL, the save changes
1. Configure the Heroku Mailgun add-on:
    1. Add DNS records:
        - TODO: details
    1. Edit `MAILGUN_*` "config variable" in "Settings" to contain the info for the verified domain instead of the sandbox domain


## Setup AWS
### AWS Root Account and Users
1. Have the client create a root account and gives us a temporary password
1. Login with the client's root account
1. On the IAM Management Console Dashboard customize the "IAM users sign-in link" with a name based on the project or client
1. Configure a password policy (1 uppercase, 1 lowercase, 1 number and 1 non-alphanumeric is probably a good minimum without being overly annoying)
1. Create an IAM user for each developer:
    1. Attach the "AdministratorAccess" policy
    1. Add 2-factor authentication (MFA) (**NOTE:** User must do this themselves)
1. **CRITICAL:** Ask client to change their root account password and add 2-factor authenticatin (MFA)

### CloudWatch and Route 53
1. Create AWS Route 53 Health Check with alert for the production hostname (_not_ the `*.herokuapp.com` hostname):
    1. Add `?ping=aws` to monitoring URL
    1. Set up string matching for something that appears in the beginning (in the first few hundred bytes) of the page (e.g., the title)
    1. Set up alert notification to `<project-name>@okgrow.com`

### S3
#### Development
1. Create a development S3 bucket named `<app-name>-app-development` with the [public-read bucket policy](https://github.com/okgrow/guides/blob/master/scripts/s3-bucket-public-read-policy.json)
1. Create a development IAM user (`<app-name>-app-development`) with API credentials, no password, [this policy](https://github.com/okgrow/guides/blob/master/scripts/app-iam-user-policy.json) and access only to development S3 bucket
    - **NOTE:** You'll need to change `APPNAME-app-STAGING_OR_PRODUCTION`

#### Staging
1. Create a staging S3 bucket named `<app-name>-app-staging` with the [public-read bucket policy](https://github.com/okgrow/guides/blob/master/scripts/s3-bucket-public-read-policy.json)
    - **NOTE:** You'll need to change `MY_BUCKET_NAME`
1. Create a staging IAM user (`<app-name>-app-staging`) with API credentials, no password, [this policy](https://github.com/okgrow/guides/blob/master/scripts/app-iam-user-policy.json) and access only to staging S3 bucket
    - **NOTE:** You'll need to change `APPNAME-app-STAGING_OR_PRODUCTION`

#### Production
1. Create a production S3 bucket named `<app-name>-app-production` with the [public-read bucket policy](https://github.com/okgrow/guides/blob/master/scripts/s3-bucket-public-read-policy.json)
1. Create a production IAM user (`<app-name>-app-production`) with API credentials, no password, [this policy](https://github.com/okgrow/guides/blob/master/scripts/app-iam-user-policy.json) and access only to production S3 bucket
    - **NOTE:** You'll need to change `APPNAME-app-STAGING_OR_PRODUCTION`


## Setup Error Logging (Sentry)

### Create a New Organisation
1. Log in to the `ok-grow` organisation with your account
1. Click the icon in the top left hand corner
1. Select "New Organization" then follow the prompts
1. Navigate to the organisations dashboard, in the top right select "New Project"
1. Follow the prompts and setup the project
1. You should now have an organisation and one project, you will now need to add anyone one the project to the organisation
1. Navigate to the organisation's settings page, select "Members" and click "Invite Member" in the top right hand corner
1. Setup billing & usage, this will be with OK GROWS! credit card or the client's

### Configure Project
1. Navigate to the "Project Settings" and set the following fields:
    1. The Project Name & Short Name should be the same
    1. Email: Subject Prefix to the project name
    1. Event Settings: Default environment to staging or production
1. Next navigate to All Integrations and add the following:
    1. Github - Optional
    1. Slack - Mandatory
    1. Trello - Recommended
1. Once these integrations have been added you will need to set them up
    1. Slack - You will need to go to [here](https://okgrow.slack.com/apps/A0F814BEV-sentry) and select "Add Configuration", and follow the prompts. Add a descripitive label to state what project the error logging is for. Save the settings and copy the Webhook URL and add it to the sentry website. You can use the same URL for both staging & production
    1. Trello - Follow these [instructions](https://github.com/damianzaremba/sentry-trello/blob/master/HOW_TO_SETUP.md) to get the API key & token. Once the keys have been saved you will need to add the Trello Organization where the Trello Board exists. **NOTE:** These keys are associated with your Trello user account
1. Next navigate to "Alerts" and select "Rules".
    1. Select "Edit Rule"
    1. Delete the two default rules and actions
    1. Add the rule "An event is seen"
    1. Add the "Send a notification via [service]", once added you can select to add Slack
    1. You should have this Alert Rule "An event is seen" and "Send a notification via Slack"
    1. Save this rule

### Meteor App Setup (web)
Add the DSN and Public DSN from your sentry.io projects to your staging and production Meteor `settings.json` files and set the environment to `staging` or `production`.

### React Native App Setup (mobile)

#### Expo
(Follow the below steps if you are using Expo for your React Native app.)

1. Ensure that you're using a version of Node that supports `async/await` (Node 7.6+).
1. `npm install sentry-cli-binary -g`
1. `npm install sentry-expo --save`
1. For the next steps please follow these [instructions](https://docs.sentry.io/clients/react-native/expo/) from sentry.
1. You must complete the above instructions for adding `sentry.config().install()` to your `main.js` or `app.js` and uploading source maps.

For more details See [Expo's docs](https://docs.expo.io/versions/latest/guides/using-sentry.html#content).

**NOTE:** At the time of writing Expo isn't using the native integration yet. Please check the status and update the guide when this changes.

#### Standard React Native
(Follow the below steps if you are not using Expo for your React Native app.)

1. `npm install react-native-sentry --save`
1. `react-native link react-native-sentry`
1. When linking you will be asked to provide the following (details are in your sentry project):
    1. `DSN`
    1. `organization slug`
    1. `project slug`
    1. `Auth token`

**NOTE:** Sentry only supports `react-native` >= 0.38. For details see the [Sentry docs](https://docs.sentry.io/clients/react-native/).


## Setup Continuous Integration (Semaphore)

### Organisation and Project
1. Login to your Semaphore account (if you haven't been added to OK GROW!'s account, ask to be added.)
1. Create a new _organisation_ in Semaphore for the client project
1. Create/Add a new project
    - TODO: details

### Project Settings
#### Build Settings
1. Set the Node version to node.js 8.9.1 (or later)
1. Add these lines under setup: [Semaphore build settings](semaphore-build-settings)
    - TODO: The build settings needs to be split into web/mobile

#### Environment Variables
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
    * `AWS_ACCESS_KEY_ID`
    * `AWS_SECRET_ACCESS_KEY`

#### Configuration Files
1. **Web:** Add the application's `settings.json` file
1. **Mobile:** Add the project's `app-production.json` file
1. **Mobile:** Add the project's `app-staging.json` file

#### Branches
1. Set the cancellation strategy to "Cancel queued and started builds", then "Save Branch Settings"

### Staging Server
1. Click “Set Up Deployment” on the Semaphore project page
1. Select "Heroku":
    1. Select "Automatic"
    1. Select the "master" branch
1. Enter the API key for the client's Heroku user
1. Select the Staging Heroku app for this project from the list; name the server “Staging”
1. On the Semaphore project page, under "Servers", click the server name (e.g., "Staging")
1. On the servers screen, click the "Edit Server" button
1. Under "Deploy commands" click the "Change deploy commands" link and paste the contents from [staging app deploy config](https://github.com/okgrow/guides/blob/master/scripts/semaphore-staging-deploy-config)
    - TODO: The deploy config needs to be split into web/mobile

### Production Server
1. Click the + button beside "Servers" on the Semaphore project page to add a new server.
1. Select "Heroku":
    1. Select "Automatic"
    1. Select the "master" branch
1. Enter the API key for the client's Heroku user
1. Select the Production Heroku app for this project from the list; name the server “Production”
1. On the Semaphore project page, under "Servers", click the server name (e.g., "Production")
1. On the servers screen, click the "Edit Server" button
1. Uncheck "Deploy automatically"
1. Under "Deploy commands" click the "Change deploy commands" link and paste the contents from [production app deploy config](https://github.com/okgrow/guides/blob/master/scripts/semaphore-production-deploy-config)
    - TODO: The deploy config needs to be split into web/mobile

### Configure Semaphore Slack Integration
1. In the project's Slack channel, click "Add an app" under "Channel Settings"
1. Add the Sempahore integration
1. Copy the web hook URL
1. Save the integration
1. On Semaphore, in Project Settings / Notifications / Webhooks, add the web hook URL and select "Build and Deploy" from the "Receive After" dropdown

### Configure AWS
Create an IAM user with API credentials, no password, with [this policy](https://github.com/okgrow/guides/blob/master/scripts/semaphore-iam-user-policy.json) and read-only access to the production S3 bucket and read-write access to the staging S3 bucket. **NOTE:** You'll need to change `APPNAME-app-staging` and `APPNAME-app-production`.
