# Support role

We always have someone assigned to "support" (it must be someone who is not currently on a client project so that we don’t take time away from a paying client).

This means responding to issues with client apps that have a monitoring agreement, and responding to issues on our open source projects.

## Client apps

We use Kadira to report client-side and server-side errors. We have a zero-error policy for apps that we manage, meaning that every error report gets dealt with as follows:

1. Add a card to Trello immediately
    - Add it to the bottom of Planned
    - Add [ERROR] to prefix the card name
    - Provide a URL to the specific error from Kadira or Ragun
    - Copy all relevant data from the error itself surrounded by code blocks ```
    - Label it as a bug
1. As soon as possible investigate and do one of the following:
    - If it’s not a real error then silence it (e.g. it’s not user-visible and is in a 3rd-party package that we can’t fix).
    - If it’s a small thing and should a few minutes to fix then just fix it.
    - If it’s significant work then schedule it. This might require planning with the client.

The support person should temporarily join the Slack channels for any apps that we are actively monitoring to see the error notifications.

## Open source projects

We try to respond quickly to any issues or PRs on our open source projects as follows:

1. Label issues according to our [labeling system](https://github.com/okgrow/guides/blob/master/open-source/contributing.md#labeling-system).
1. If it’s an unsupported project tell them so and close the issue.
1. Consult with someone who knows the code well, ask them to pair if needed.
1. Deal with PRs before issues, either merge, reject, or ask for changes. (Make sure the style is good and everything up to our standards of quality in every way).
1. For issues that we want to fix (i.e. not labeled as `wont-fix` or `pull-requests-encouraged`) work on the fix.
