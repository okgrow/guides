# New app setup

It's very important that we hit the ground running when we start a new project. In order to do that we need to follow a checklist and make as few decisions as possible. We love to try new things but the first week of a new project is not the time to do it.

This assumes the discovery week has already happened.

# Production and staging apps

We currently use Heroku or Galaxy for hosting new Meteor apps. Depending on the projects requirements we will select one or the other.

## Heroku setup

1. Create new app
1. Copy all relevent configuration and code from private guides repo, including `settings.example.json` file to project
1. Create staging Heroku app using the [create-heroku-app](scripts/create-heroku-app) script.
    1. For meteor projects use [our fork of the "horse" buildpack](https://github.com/okgrow/meteor-buildpack-horse.git)
    1. Configure Logentries
        1. Add the Logentries Slack integration to the project channel
        1. Disable email for all notifications and add the Slack webhook URL
        1. disable some notifications which get triggered by every websocket connection:
            1. High response time
            1. Connection closed w/o response
            1. Idle connection
1. Create production Heroku app (same steps as staging)
    1. Configure Mailgun add-on
      2. Add DNS records
      3. Edit `MAILGUN_*` env vars to contain the info for the verified domain (instead of the sandbox domain).
    1. If you are configuring dynos Heroku requires a `Procfile` where you specify the startup process commands. Here is a basic meteor example [Procfile](procfile-example)

## Galaxy setup

 TODO....

# AWS setup

1. Set up AWS account
  1. Client creates root account and gives us temporary password
  1. Set custom IAM login domain
  1. Create IAM user for each developer
    1. Add 2-factor auth (MFA)
    1. Attach AdministratorAccess policy
    1. Ask client to change root account password and add MFA
1. Create AWS Route 53 Health Check with alert for the production hostname (not the *.herokuapp.com hostname)
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
        31. Set METEOR_SETTINGS env var on production app in same format as [default settings.json.example file](https://drive.google.com/open?id=0B4JoTt-NyIq5WUtWOFlkSDlXT2s) (but with line-ends removed)
    1. Staging
        1. Create staging S3 bucket named &lt;app-name&gt;-app-staging
            1. Add [public-read bucket policy](s3-bucket-public-read-policy.json)
        1. Create staging IAM user with access only to staging S3 bucket
            1. [Add policy](app-iam-user-policy.json)
            1. Ensure the user has API credentials, no password
        1. Set AWS config env vars on staging app

# Error Logging

  Since the shutdown of Kadira we have started to use [sentry.io](https://sentry.io) for error tracking and reporting. You can sign into sentry using single sign on with your work gmail account.

  Depending on the project you may create a new organaisation for the project or create a new project under the existing OK GROW! organaisation. The reason for creating a new org is mainly for billing purposes and managing users outside of OK GROW!.


  #### Steps to create a new organaisation:
  1. Once logged in. Click the icon in the top left hand corner.
  2. Select "New Organization" and follow the prompts.
  3. You should now have an organisation and one project, you will now need to add anyone one the project to the organisation.
  4. Navigate to the organisation's settings page and select "Members". Click "Invite Member" in the top right hand corner.
  5. Setup billing & usage, this will be with OK GROWS! credit card or the Clients.


  #### Create Projects:

  1. Every app we build will need to have at least two projects to track errors. e.g - a staging and production project. The recommended syntax for a projects name is `myproject-staging` and `myproject-production`.
  2. Navigate to the organisations dashboard, in the top right select "New Project".
  3. Follow the prompts and setup the project.
  4. Navigate to the "Project Settings" and set the following fields:
    1. Email: Subject Prefix to the projects name.
    1. Event Settings: Default environment to staging or production.
    1. The Project Name & Short Name should be the same.
    1. The Team should be the Team for the organisation the project belongs to. If the project is under OK GROW! then set it to OK GROW!
  5. Next navigate to All Integrations and add the following:
    1. Github - Optional
    1. Slack - Mandatory
    1. Trello - Recommended
  6. Once these integrations have been added you will need to set them up.
    1. Github - (Optional) Follow instructions to setup.
    1. Slack - You will need to go to [here](https://okgrow.slack.com/apps/A0F814BEV-sentry) and select "Add Configuration", and follow the prompts. Add a descripitive label to state what project the error logging is for. Save the settings and copy the Webhook URL and add it to the sentry website. You can use the same URL for both staging & production.
    1. Trello - Follow these [instructions](https://github.com/damianzaremba/sentry-trello/blob/master/HOW_TO_SETUP.md) to get the API key & token. Once the keys have been saved you will need to add the Trello Organization where the Trello Board exists. Note these keys are associated with your trello user account.
  7. Next navigate to "Alerts" and select "Rules".
    1. Now you will need to select "Edit Rule"
    1. Delete the two default rule & action.
    1. Now add the rule "An event is seen".
    1. Next add the "Send a notification via [service]", once added you can select to add Slack.
    1. You should have this Alert Rule "An event is seen" & "Send a notification via Slack".
    1. Now save this rule :)

#### Meteor apps setup

  1. All you have to do is have used our base meteor app to get started.
  2. You will need to add the DSN and Public DSN from your sentry.io projects to your meteor settings for staging & production.


#### Exponent - React-Native setup
1. TODO: This will need to be updated once we have a build script completed.
2. Currently you can follow the steps taken for the Rapunzl project.

# MongoDB Atlas

If the project is using Galaxy to host the app the MongoDB Atlas is the recommended hosting provider. If you already have an account it will take you about 5 mins to setup. You can find detailed step-by-step instructions to getting setup and started in our blog post [here](https://www.okgrow.com/posts/mongodb-atlas-setup).

Atlas is the best option if wishing to scale CPU & Memory independently to it's storage & disk I/O, cheapest for using the WiredTiger Storage engine, encrypting data at rest, have 3 to 7 data bearing nodes, continuous backups & snapshots. 

# CI

AWS config:

1. Create IAM user with read-only access to production S3 bucket and read/write access  to staging S3 bucket
    1. [Add policy](https://drive.google.com/open?id=0B4JoTt-NyIq5Y2RuYjZPTFAwd0U)
    2. Ensure the user has API credentials, no password

MongoDB create users:

1. Create read-only user for production DB
2. Create user on staging DB (not read-only)

Semaphore config:

1. Create new project
    1. NOTE: Paul needs to do this step currently. Will fix...
1. Edit build settings:
    1. Go to [https://semaphoreci.com/okgrow/](https://semaphoreci.com/okgrow/)&lt;PROJECT_NAME&gt;/settings
    1. Set the Node version to node.js 4.7.3
    1. Add each of these lines under setup
        1. `curl https://install.meteor.com/ | sh`
        1. `meteor --version`
        1. `npm install`
        1. `cp settings.json.example settings.json`
    1. Note: You may also need to add more project specific steps.
    1. Add the test runner under "Job #1": `npm test`
1. In Heroku: Under ‘Access’, add [accounts+semaphoredeploy@okgrow.com](mailto:accounts+semaphoredeploy@okgrow.com) as a collaborator in the staging and production Heroku app
1. On the sempahore project homepage click “Set Up Deployment” (staging)
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
    1. Add the webhook URl and select 'Build and Deploy' from the 'Recieve After' dropdown
