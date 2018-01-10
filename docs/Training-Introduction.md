---
id: training:intro
title: Introduction
---

OK GROW! training is run thanks to two GitHub repositories: one hosting the code and one hosting the slides

## Problem: repetitive dumb work

When developing a workshop, the main problem is often keeping the code we write in sync with our slides. We previously wrote our slides on Google Slides.

All the slides tweaks, like the exercise number, topic related to the exercise, or the exercise goal, following a minor change in the code are a lost of time and should be automated.

## Solution: automating dumb work

This is the infrastructure we have built at OK GROW!: our training slides are powered by a React application which reads workshop's code hosted on GitHub. In other words, a basic presentation with a skeleton following the code hosted on GitHub is generated automatically. **This method allows trainers to focus on what really matters: teaching a concept.**

## GitHub workshop code

Workshop data are fetched thanks to the GitHub GraphQL API: we send a query requiring the commits history on a private repository hosting the workshop code.

The commits history received match a series of exercises. Each commit message follow the same structure:

* The headline provides a topic identifier, like `#schema-stitching` or `#optimistic-ui`.
* The description includes the goal of the exercise, instructions to complete it, along some tips & documentations.

Informations contained in the headline allow us to group exercises by topic and match these exercises with hand-written slides. Descriptions are written in Markdown syntax, and then rendered as invididual slides.

## Custom slides

It's now easy to add custom slides to give more context about an exercise: a trainer can write custom slides as markdown content, as a sample of code (automatically highlighted), render regular React component to add interactivity to the presentation or combine of these solutions.

By naming the slide file with a corresponding topic, its content will automatically be added at the right spot when rendered. As well as organizing slides automatically when rendering the presentation, if topic's slides depends on assets such as Markdown files, code samples or images, these assets can be imported automatically by matching the name of the topic to the corresponding assets directory.

Technically, slides are rendered thanks to `spectacle`, built on top of an ejected `create-react-app` with a custom Webpack loader to load slides assets.
