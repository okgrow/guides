---
id: training:source:generating
title: Generating a class repository
---

Let's say you want to run GraphQL Fundamentals training on March 5. 2018. Please be an engineer, don't copy/paste blindly the lines below.

1. Add `okgrow/graphql-fundamentals` as a new origin of your clone of `okgrow/training` repository. We'll call this origin `workshop` in this example.

```
git remote add workshop https://github.com/okgrow/graphql-fundamentals
```

2. Checkout on `graphql-fundamentals` branch & reate a new branch with the date of the workshop:

```
git checkout graphql-fundamentals
git checkout -b 2018-03-05
```

3. Push this branch to the `workshop` repository:

```
git push -u workshop 2018-03-05
```
