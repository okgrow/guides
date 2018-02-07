---
id: new-app-setup-production-staging
title: Production & Staging - Checklist
---

It's important to hit the ground running when starting a new project. To do that we use a checklist and make as few decisions as possible. We love trying new things but the first week of a new project is not the time for that.

This assumes the discovery week has already happened.

Use Heroku or Galaxy, based on project requirements, for hosting Meteor apps. This guide provides instructions for setting up either.

## App Project

Begin you new application by following the steps with the OKGROW! [`starter-kit`](https://github.com/okgrow/starter-kit).

## Heroku

1. Add the Logentries Slack integration to the project's Slack channel
   1. Go to the project's Slack channel and, under "Channel Settings" click "Add an app or integration"
   1. Add Logentries as an integration and copy the web hook URL; save the integration

### Create or Join Team

1. You must first Create or Join a Team where the Heroku Apps will be hosted.
   1. NOTE: Billing must be setup for the team before you can create the staging & production apps.
1. If you are creating the Team, you will need to fill out the billing information and invite your team members to the Team as Admins.
1. Additionally you will need to create/or add a `developers@<domain>.com` as a team member with member access permission.
   1. You will need to record the API key for this user from Heroku and add it to the semaphore CI deployment servers.

### Staging

1. Create staging Heroku app using the [create-heroku-app](https://github.com/okgrow/guides/blob/master/scripts/create-heroku-app) script.
   * NOTE: You'll want to specify "-staging" in the name.
   * NOTE: This should be run from within the project folder
1. For meteor projects use [our fork of the "horse" buildpack](https://github.com/okgrow/meteor-buildpack-horse.git)
1. Configure the Logentries add-on in Heroku
   1. Disable some notifications which get triggered by every web socket connection:
      1. High response time
      1. Connection closed w/o response
      1. Idle connection
   1. Disable email for all notifications and add the Slack web hook URL
      * **NOTE** This is a process that involves editing each notification. (TODO: details)
1. Set your MongoDB URL in your environment URL variable
   1. Retrieve your URL from the MongoDB Service you have selected to use (MongoDB Atlas or mLab)

### Production

1. Create production Heroku app using the [create-heroku-app](https://github.com/okgrow/guides/blob/master/scripts/create-heroku-app) script.
   * NOTE: You'll want to specify "-production" in the name.
   * NOTE: This should be run from within the project folder
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
1. Set your MongoDB URL in your environment URL variable
   1. Retrieve your URL from the MongoDB Service you have selected to use (MongoDB Atlas or Compose)
   1. Create read-only user for production DB

## Database Setup

### Database Information Document

Create a new spreadsheet in the project's "Development" folder in Google Drive and record any relevant database information for both staging and production databases.

## MongoDB Atlas

MongoDB Atlas is the recommended database hosting provider. If you have an account, it will take about 5 minutes to setup. If this is your first time & wish to understand more about setting up MongoDB for staging/production follow this detailed step-by-step instructions in our ["MongoDB Atlas Setup" blog post](https://www.okgrow.com/posts/mongodb-atlas-setup).

### MongoDB Atlas - Create Client Orginsation Steps

1. Login to Atlas using your okgrow account. If you don't have one create one & setup your 2fa.
1. Go to Account Settings -> Organizations (top right corner, drop down menu on your username & select Organizations) or use this [url](https://cloud.mongodb.com/v2#/account/organizations)
1. Create a new Organization
1. Provide the name of the organization & select MongoDB Atlas
1. Provide email address for the members you wish to invite to the org (client & team mates)
1. Left hand side under Organization go to Settings -> then select Payment Method. (You can add the credit card info for the org or ask the client to enter themselves)
1. Left hand side under Organization go to Projects -> then select New Project & enter the name of the project & invite the users you want to the project

### MongoDB Atlas - Create & setup your Staging & Production DB
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

## Meteor Galaxy Deployment

Missing details, to complete.


## AWS

> Not all apps require AWS, this section is optional.

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
