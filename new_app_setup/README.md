New App Setup
==========

1. Create <project>@okgrow.com alias/group https://admin.google.com/okgrow.com/
1. Create new app and add miraclegrow package via git submodule
1. Add default settings.json.example file to project
1. Copy settings.json.example and rename it to `staging.json` (and again for `production.json`)
    * Add `staging.json` and `production.json` to your .gitignore
1. Create a staging app on Galaxy
    * Create a new organization for the app
    * Add all the team members who will be working on that app
    * Deploy a staging app using staging settings
        * `DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy [APP NAME]-staging --settings staging.json`
1. Configure Logentries
    * TODO
1. Configure Mandrill
    * TODO
        * set email address to <project>@okgrow.com) https://mandrillapp.com/account/contact
        * Turn off weekly account activity email
1. Configure Kadira
    * Create a new app in Kadira Dashboard
    * Follow the steps, and add environment variables to `staging.json` in the `galaxy.meteor.com` env object
    * Set up Slack and email alerts for errors > 0 at least once (specific errors can be ignored in the app’s config) (staging and production can share the same Slack webhook URL).
1. Create production Galaxy app (same steps as staging)
    * Add Slack deployment notification
1. Set up AWS account
    * Client creates root account and gives us temporary password
    * Set custom IAM login domain
    * Create IAM user for each developer
        * Add 2-factor auth (MFA)
        * Attach AdministratorAccess policy
    * Ask client to change root account password and add MFA
1. Create AWS Route 53 Health Check with alert for the production hostname (not the *.meteorapp.com hostname)
    * Add ?ping=aws to monitoring URL
    * Set up string matching for something that appears in the beginning of the page, e.g. the title.
    * Set up alert notification to <project>@okgrow.com
1. Create S3 buckets
    * Production
        * Create production S3 bucket named <app-name>-app-production
            * Add public-read bucket policy
        * Create production IAM user with access only to production S3 bucket
            * Add policy
            * Ensure the user has API credentials, no password
            * Set METEOR_SETTINGS env var on production app in same format as default settings.json.example file (but with line-ends removed)
    * Staging
        * Create staging S3 bucket named <app-name>-app-staging
            * Add public-read bucket policy
        * Create staging IAM user with access only to staging S3 bucket
            * Add policy
            * Ensure the user has API credentials, no password
            * Set AWS config env vars on staging app


[CI & auto-deployment setup](https://github.com/okgrow/guides/CI_and_auto_deployment_setup)