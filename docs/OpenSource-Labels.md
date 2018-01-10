---
id: open-source:labels
title: GitHub Labels
---

The JSON below is here in order to specify the [labels](../opensource:contributing.md#labels) we use in our repositories.

```json
[
  {
    "name": "bug",
    "color": "ee0701"
  },
  {
    "name": "duplicate",
    "color": "cccccc"
  },
  {
    "name": "enhancement",
    "color": "84b6eb"
  },
  {
    "name": "good for beginners",
    "color": "fbca04"
  },
  {
    "name": "help wanted",
    "color": "159818"
  },
  {
    "name": "question",
    "color": "cc317c"
  }
]
```

These labels can be applied automatically to all repositories in the organization by running [org-labels](https://github.com/repo-utils/org-labels):

```sh
# Install
npm i -g org-labels
# Run
org-labels standardize okgrow okgrow/guides
```

Individual labels may be created individually using the GitHub interface, as well.
