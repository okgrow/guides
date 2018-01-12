---
id: training-slides-configuring
title: Configuring the slides
---

The application is ruled by a `training.config.json` file. This file describes 3 kinds of fields:

* the data fields, `repository` & `branch`: how to get commits history from GitHub, main training source repository or current class repository;
* the current class fields, `company` & `trainers` who are the attendees and who are the trainers;
* the pre-requisites, or so-called `exercise0`.

Here a sample:

```json
{
  "repository": "training",
  "branch": "advanced-graphql",
  "company": "TEST",
  "trainers": [{ "name": "John Doe", "twitter": "john_doe" }],
  "exercise0": [
    {
      "title": "Computer Setup",
      "items": [
        {
          "name": "Git",
          "href":
            "https://git-scm.com/book/en/v2/Getting-Started-Installing-Git"
        }
      ]
    },
    {
      "title": "API Keys",
      "items": [
        {
          "name": "Google Maps API",
          "href": "https://google"
        }
      ]
    }
  ]
}
```

## GitHub fields

`repository: String` — which repository hosts the source code for the workshop.

`branch: String` — which branch hosts the source code for the workshop.

## Homescreen fields

`company: String` — who are the attendees.

`trainers: Array[{name: String, twitter: String}]` — a list of the trainers, teachers, assistants with their full name and their Twitter handle

## Exercise 0 fields

`exercise0: Array[ {title: String, items: [ {name: String, href: String} ]} ]` — A list of pre-requisites, described by a category, with a `title`, and a sub-list of items described by a `name` & a web reference `href`.

This is called "Exercise 0" because this is the first thing the attendees need to do prior to start the workshop, like installing Git, having an IDE, get the required API keys to boot the workshop's app they are going to build.
