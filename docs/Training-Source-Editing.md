---
id: training:source:editing
title: Editing a workshop source
---

## Make sure you have all branches

As the advanced workshops are built on top of the fundamentals workshops, changes made in fundamentals branches need to be populated in advanced branches.

To do so, **ensure that you've all branches locally**.

## Workflow: rewrite history with GitUp

Commits messages are written in _Markdown_ and use `# Headings`: the `#` symbol is a comment symbol in Git.

It is **strongly** disrecommended to use the command line to edit commits from the training source: we recommend to use [GitUp](https://github.com/git-up/GitUp), a powerful UI to manage Git.

All workshops have been written and edited with this software, it works really well.

You can rewrite commits, splits them or squash them really easily. Once you've modified something, push force your changes to related branches: a change in a `graphql-fundamentals` exercise means that you need to `git push --force` the `graphql-fundamentals` branch & the `advanced-graphql` branch.
