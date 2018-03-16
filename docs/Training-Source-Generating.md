---
id: training-source-generating
title: Generating a class repository
---

Let's say you want to run GraphQL Fundamentals training on March 5. 2018. Please be an engineer, don't copy/paste blindly the lines below.

1. Add `okgrow/graphql-fundamentals` as a new origin on your clone of the `okgrow/training` repository. We'll call this origin `graphql-fundamentals` in this example.

```
git remote add graphql-fundamentals https://github.com/okgrow/graphql-fundamentals
```

2. Check out the `graphql-fundamentals` branch and reate a new branch with the date of the workshop:

```
git checkout graphql-fundamentals
git checkout -b 2018-03-05
```

3. Push this branch to the `graphql-fundamentals` repository:

```
git push -u graphql-fundamentals 2018-03-05
```
