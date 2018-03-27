---
id: training-source-structure
title: Structure of the training source
---

## Commits history and branches

Workshops are based on one another, thanks to Git branches:

1. `react-fundamentals` lays out the base of a React app
2. `graphql-fundamantals` adds a simple GraphQL backend
3. `advanced-graphql` transform it in a real-world app.

## Workshop start commit

Workshops are identified by a specific commit that makes the transition between two workshops and install the missing dependencies.

You can recognize it by its commit headline:

```
⊂(◕‿◕)つ NAME OF THE WORKSHOP
```

## Workshop exercise commit

Commits are exercises on the workshop repository.

They contain the number of the exercise, the topic associated, the environment the exercise belongs to, the instructions and additional notes:

```
Exercise 11 #schema-stitching

[API]

### Goal
Add weather to Place.location and view on Graphiql

### Instructions
1. Extend the location type to accept a `weather: Weather` field
2. Merge this type definition with the other schemas
3. Write a resolver for this field using the `mergeInfo.delegate` function to ask for the root query `weather` with the rights arguments
4. Go to [Graphiql](http://localhost:3000/graphiql) and run the `places` query with weather information

---
### Tips
- The type definition to write is just a string, it will make the link between the local schema and the remote schema: from the location to get the weather
- If you don't write a `fragment` for the resolve function, you'll be forced to query weather with `longitude` & `latitude` fields

### Docs
- [Resolvers between schemas (docs + example)](http://dev.apollodata.com/tools/graphql-tools/schema-stitching.html#adding-resolvers)
```

Let's break it down:

```
> Exercise 11
Title of the exercise slide

> #schema-stitching
Topic of the exercise

> [API]
Environment of the exercise

> ### Goal
> ...
Instructions

> ---
Separation between instructions and notes

> ### Notes
> ...
Notes
```
