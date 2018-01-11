---
id: new-app-setup-error-logging
title: Error Logging
---

### Error Logging

We are using [Sentry.io](https://sentry.io) for error tracking and reporting. You can sign into sentry using single sign on with your gmail account.

Depending on the project, you may create a new organisation for the project or create a new project under the existing OK GROW! organisation. Creating a new organisation is mainly for billing purposes and managing users outside of OK GROW!.

#### Create a New Organisation:

1. Log in.
1. Click the icon in the top left hand corner.
1. Select "New Organization" then follow the prompts.
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

#### Expo - React Native Setup

1. Ensure that you're using a version of Node that supports `async/await`(Node 7.6+).
1. `npm install sentry-cli-binary -g`
1. `npm install sentry-expo --save`
1. For the next steps please follow these [instructions](https://docs.sentry.io/clients/react-native/expo/) from sentry.
1. You must complete the above instructions for adding `sentry.config().install()` to your `main.js` or `app.js` and uploading source maps.

For more details take a look at expo's docs [here](https://docs.expo.io/versions/latest/guides/using-sentry.html#content).

_Note:_ At the time of writing Expo isn't using the native integration yet, hopefully this will change in a future release. Please check the status and update the guide when this changes.

#### React Native Setup

Follow the below steps if you are not using Expo for your React Native app.

1. `npm install react-native-sentry --save`
1. `react-native link react-native-sentry`
1. When linking you will be asked to provide the following(details are in your sentry project):
   1. `DSN`
   1. `organization slug`
   1. `project slug`
   1. `Auth token`

_Note:_ currently sentry only supports `react-native >= 0.38`. To learn more read the sentry docs [here](https://docs.sentry.io/clients/react-native/).
