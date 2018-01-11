---
id: training-slides-deploying
title: Deploying the slides
---

Slides are hosted on AWS S3, on `https://training-slides.okgrow.com` sub-domain. We create a static bundle that we then send to S3.

## 1. Edit the config

Like in dev mode, the app will look for commits data to parse.

Be sure that the `training.config.json` file points to the right repository, branch and have the appropriate company name:

```json
{
  "repository": "graphql-fundamentals",
  "branch": "2018-03-05",
  "company": "OK-GROW!" // no space allowed
  // ...
  // trainers, exercise 0
}
```

## 2. Build the slides

With such a config, you can now run:

```shell
yarn build
```

This will fetch the appropriate repository on GitHub and create an optimized bundle under a `build` folder.

## 3. Running the deploy script

You can now run:

```
yarn deploy
```

This runs a shell script that deploys to S3 under a url that matches:

```
https://training-slides.okgrow.com/REPOSITORY-COMPANY-BRANCH
```

Eg. https://training-slides.okgrow.com/advanced-graphql-GraphQL-Summit-2017-10-24/
