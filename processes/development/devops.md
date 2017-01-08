# Devops

## Hosting

We like to focus our time on the highest value activities for our clients, and it's usually worth it for them to spend more on hosting in order to save on our time. So we like to use PaaS (platform-as-a-service) hosting.

We have some apps that use [Meteor Galaxy](https://galaxy.meteor.com/). It's an excellent hosting platform for Meteor apps, we have lots of experience with it, and we recommend it for clients with Meteor apps who want to eventually manage their own hosting.

For all other apps we have standardized mostly on Heroku (which we have been using since 2012) because the add-on architecture saves us literally days of effort for each project. It allows us to use most external services (database, monitoring, logging, etc.) as add-ons which saves time with account setup and configuration and allows billing to be centralized and managed via the Heroku app, and eventually transfered to a new owner along with the Heroku app with no effort.
Also it's proven and robust (it's a Salesforce product, it runs on AWS architecture, and it's a very mature service), and flexible (build packs allow configuring and installing almost anything).

We also use AWS services directly when necessary and have years of experience using many AWS services.

### AWS account info

- Log in here: https://okgrow.signin.aws.amazon.com/console
- Userid is your first name
- We always enable 2-factor auth with the Google Authenticator app but it needs to be done at account creation time because the QR code is only shown to the admin.


## Monitoring

For apps that we are actively working on or that have a monitoring agreement we proactively monitor and resolve issues. This is the responsibility of the team actively working on the project if there is one, or else whoever is on [support](#support-role).

TODO
