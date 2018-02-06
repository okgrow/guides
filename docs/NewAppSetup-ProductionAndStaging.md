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

### Staging

1. Create staging Heroku app using the [create-heroku-app](https://github.com/okgrow/guides/blob/master/scripts/create-heroku-app) script.
   * NOTE: You'll want to specify "-staging" in the name.
   * NOTE: This should be run from within the project folder
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

### Production

1. Create production Heroku app using the [create-heroku-app](https://github.com/okgrow/guides/blob/master/scripts/create-heroku-app) script.
   * NOTE: You'll want to specify "-production" in the name.
   * NOTE: This should be run from within the project folder
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
1. Add the Compose MongoDB add on.
   1. TODO: details
   1. Create read-only user for production DB

### Database Information Document

Create a new spreadsheet in the project's "Development" folder on the Google Drive and record the database information from both staging and production databases.

## Galaxy

Missing details, to complete.

## MongoDB Atlas

MongoDB Atlas is the recommended database hosting provider. If you have an account, it will take about 5 minutes to setup. Detailed step-by-step instructions for getting setup and started can be found in our ["MongoDB Atlas Setup" blog post](https://www.okgrow.com/posts/mongodb-atlas-setup).

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
