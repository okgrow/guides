---
id: training-source-editing
title: Editing a workshop source
---

## Make sure you have all branches

As the advanced workshops are built on top of the fundamentals workshops, changes made in fundamentals branches need to be populated in advanced branches.

Before editing anything ensure that you have all branches locally and that they have been reset to the current version from the remote repo using the [dangerously-pull-training-repo](https://github.com/okgrow/guides/blob/master/scripts/dangerously-pull-training-repo.sh) script`.

## Workflow: rewrite history with GitUp

Commits messages are written in _Markdown_ and use `# Headings`: the `#` symbol is a comment symbol in Git.

It is **strongly** discouraged to use the command line to edit commits from the training source: we recommend to use [GitUp](https://github.com/git-up/GitUp), a powerful UI to manage Git.

All workshops have been written and edited with this software, it works really well.

You can rewrite commits, splits them or squash them really easily. Once you've modified something, force push your changes to related branches: e.g. a change in a `graphql-fundamentals` exercise means that you need to `git push --force` the `graphql-fundamentals` branch and the `advanced-graphql` branch.

## Push all changes to the remote repo

Push your changes to the remote repo using the [dangerously-push-training-repo](https://github.com/okgrow/guides/blob/master/scripts/dangerously-push-training-repo.sh) script`.

This will force push all branches.