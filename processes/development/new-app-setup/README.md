# New app setup

It's very important that we hit the ground running when we start a new project. In order to do that we need to follow a checklist and make as few decisions as possible. We love to try new things but the first week of a new project is not the time to do it.

This assumes the discovery week has already happened.

# Production and staging apps

1. Create new app
1. Copy all relevent configuration and code from private guides repo, including `settings.example.json` file to project
1. Create staging Heroku app using the [create-heroku-app](scripts/create-heroku-app) script.
    1. Configure Logentries
        1. change email address for all notifications to &lt;project&gt;@okgrow.com
        1. disable some notifications which get triggered by every websocket connection:
            1. High response time
            1. Connection closed w/o response
            1. Idle connection
    1. Configure Kadira
        1. Set up Slack and email alerts for errors > 0 at least once (specific errors can be ignored in the app’s config) (staging and production can share the same Slack webhook URL).
1. Create production Heroku app (same steps as staging)
    1. Configure Mailgun add-on
      2. Add DNS records
      3. Edit `MAILGUN_*` env vars to contain the info for the verified domain (instead of the sandbox domain).
1. Set up AWS account
    1. Client creates root account and gives us temporary password
    1. Set custom IAM login domain
    1. Create IAM user for each developer
        1. Add 2-factor auth (MFA)
        1. Attach AdministratorAccess policy
    1. Ask client to change root account password and add MFA
1. Create AWS Route 53 Health Check with alert for the production hostname (not the *.herokuapp.com hostname)
    1. Add ?ping=aws to monitoring URL
    1. Set up string matching for something that appears in the beginning of the page, e.g. the title.
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

MongoLab create users:

1. Create read-only user for production DB
2. Create user on staging DB (not read-only)

Semaphore config:

1. Create new project
    1. NOTE: Paul needs to do this step currently. Will fix...
1. Edit build settings:
    1. Go to [https://semaphoreci.com/okgrow/](https://semaphoreci.com/okgrow/)&lt;PROJECT_NAME&gt;/settings
    1. Set the Node version to node.js 0.12
    1. add each of these lines under setup
        1. `curl https://install.meteor.com/ | sh`
        1. `meteor --version`
        1. `npm install`
        1. `cp settings.json.example settings.json`
   1.  add the test runner under "Job #1": `npm test`
1. In Heroku: Under ‘Access’, add [accounts+semaphoredeploy@okgrow.com](mailto:accounts+semaphoredeploy@okgrow.com) as a collaborator the staging Heroku app
1. Semaphore project settings → Deployment → Set up your first server → To Heroku → Automatic
1. Select master as the branch you want to build from
1. Enter the API key for the [accounts+semaphoredeploy@okgrow.com](mailto:accounts+semaphoredeploy@okgrow.com) Heroku user, it’s in the [Accounts spreadsheet](https://docs.google.com/a/okgrow.com/spreadsheet/ccc?key=0AoJoTt-NyIq5dHBiZ29xdFhjTE9sendyRnR1SHdtanc&usp=sharing)
1. Select the staging Heroku app for this project from the list, and name it “Project Name Staging”
1. Set up deployment:
    1. Click the “Set Up Deployment” button on the main page for the project
    1. Select Heroku, then Automatic
    1. Select master as the branch to deploy
    1. Enter the API key for the  accounts+semaphoredeploy@okgrow.com account
    1. Select the staging heroku app
    1. Add the [staging app deploy config](semaphore-staging-deploy-config)
1. Add Slack notifications (no email)
    1. All deploys
    1. When builds change status
