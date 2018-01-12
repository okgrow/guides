---
id: project-management-agile-adaptation
title: Agile Adaptation
---

Our project management process is a form of Agile that has been adapted (and continues to evolve) from [XP](http://www.extremeprogramming.org/rules.html) with some influence from [Kanban](https://leankit.com/learn/kanban/what-is-kanban/) (mostly the principle of "limit work in progress").

## Project roles

Each project has the following roles:

* Project lead: responsible for all things. We take turns being project lead. The project lead runs the [project meetings](#meetings)
* Developer or designer: anyone else who’s working on the project.
* Project advisor: someone who’s not actively working on the project but keeps an eye on things and helps out where needed.

## Weekly cadence

* Each team member is on a project 100% for one or more weeks.
* We plan our work in weekly iterations which run from Monday to Thursday (Fridays are [investment time](dev-investment-time.html)).

## Meetings

The project lead runs the meetings. Each project has the following meetings:

1. A weekly one hour [retrospective and planning meeting](project-management-retrospective-planning.html) with the dev team only as early as possible on Monday morning.
1. A weekly one-hour review meeting with the client whenever is convenient for everyone.
1. We have a quick (15 minutes) daily status meeting, with the dev team only, 3 days/week (every day except the day of the weekly meeting and investment day). (We would call it "stand-up" except that it's mostly via Google Hangouts so we're not necessarily standing).

## Tracking work

We use Trello, with cards to represent user stories (or sometimes technical tasks) and lists to show the state of each card. Cards move from left to right across the following columns:

1. Future: ideas for future work that isn't currently planned. Dump anything here.
1. Planned: things that we've definitely agreed to do within the current phase only.
1. This week: things that we're going to do this week. We fill this up at the weekly planning meeting.
1. In progress: actively being worked on right now.
1. Testing and code review: being tested and reviewed by another developer.
1. Client review: ready for you to review on the staging server.
1. Done YYYY-MM-DD: We have one of these for each iteration (note this is the date of the iteration start, i.e. the date of the weekly meeting). This contains cards that are done (accepted by the client) during the iteration that starts

## Development workflow

* If there's anything in the "testing & code review" list on Trello then test and review that before starting a new card.
  * Review the code (there should be a PR associated with it, hopefully linked in a comment on the Trello card).
  * Test it
  * Comment on the PR and let the author merge and deploy it
* If there's nothing to test then take the card from the top of "This week" (move it into "In progress" and add yourself to it).
* Develop the feature on its own local branch (rebasing against master if it has not yet been shared).
* Push branch to GitHub and move card to the "testing & code review" list.
* CI
  * Semaphore runs tests for each branch automatically.
  * Semaphore automatically deploys master to staging and resets data to a copy of production.
  * See [Error Logging](new-app-setup-error-logging.html) section.
* Each project has a shared project Google Drive folder. Anything not in the git repo (PSDs etc.) should be in there. (Actually work on them in there rather than copying them in later because it's too easy to forget!)
