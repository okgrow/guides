# New app setup

It's very important that we hit the ground running when we start a new project. In order to do that we need to follow a checklist and make as few decisions as possible. We love to try new things but the first week of a new project is not the time to do it.

This assumes the discovery week has already happened.

# Production and staging apps

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
    1. Configure Kadira
        1. Add kadira to your meteor project, `meteor add meteorhacks:kadira`
        1. Add a staging and production app in the Kadira UI and add the environment variables to the appropriate heroku app
        1. Set up Slack and email alerts for errors > 0 at least once (specific errors can be ignored in the app’s config) (staging and production can share the same Slack webhook URL).
1. Create production Heroku app (same steps as staging)
    1. Configure Mailgun add-on
      2. Add DNS records
      3. Edit `MAILGUN_*` env vars to contain the info for the verified domain (instead of the sandbox domain).
    1. If you are configuring dynos Heroku requires a `Procfile` where you specify the startup process commands. Here is a basic meteor example [Procfile](procfile-example)
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

## CI

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
    1. Set the Node version to node.js 6.3.1
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
