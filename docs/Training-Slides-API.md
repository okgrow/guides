---
id: training-slides-api
title: API Internals
---

## React App entry point

#### `index.js`

This is where we call `ReactDOM.render`: we render the `<Presentation />` element with a `<Watermark />` element.

#### `presentation.js`

This file exports the `Presentation` component, enhanced by a HOC `withData` that parses GitHub commits data (related to the workshop configured).

`Presentation` is the core of the slides: it renders a [Spectacle](https://github.com/formidablelabs/spectacle) `Deck`.

The deck is structured like below:

1. Exercise 0 - is everyone set up? _- generated from config_
2. Welcome - who? what? when? _- generated from config_
3. What we'll cover - topics list _- generated from GitHub data_
4. Introduction _- generated from handwritten slides (ex: `advanced-graphql/introduction.js`)_
5. Exercise 0 - is everyone _really_ set up? _- generated from config_
6. Workshop slides - Topic (_github_), explanations (_handwritten_), exercises (_github_), repeat.
7. What we've cover - topics list _- generated from GitHub data_
8. Conclusion _- generated from handwritten slides (ex: `advanced-graphql/conclusion.js`)_

## Transforming commits into slides

### `parseCommits`

This function is the data preparation of step 6. from above: preparing workshop slides.

`advanced-graphql` is built on top of `graphql-fundamentals`, itself built on top of `react-fundamentals`. These workshops are separated by a "commit identifier", commonly... `⊂(◕‿◕)つ xyz`.

`parseCommits` transform a raw list of commits, starting at the commit identifier, into a flat list repeating the following scheme:

* a slide introducing a topic
* possible custom slides to explain the topic
* exercises slides

Note: topic custom slides are not required for the application to work, though it is advised to provide some slides to explain the concept you want the attendees to work on.

### `renderWorkshop`

Transform the output of `parseCommits` into a list of React elements (`[<Slide ... />, ...]`).

```js
const data = parseCommits({ trainingStartIdentifier nodes, name });

const slides = renderWorkshop({ data });
```

`data` is a list of entry with a structure matching the pattern below:

```js
{
  topic, // dashed topic name: optimistic-ui
  abbreviatedOid, // commit hash, only present if exercise slide: fe84c211
  commitUrl, // commit url, only present if exercise slide: https://github.com/okgrow/...
  title, // slide title
  environment, // exercise environement, only present if exercise slide: UI / API
  instructions, // markdown, only present if exercise slide
  notes, // markdown, only present if exercise slide
  customSlide, // handwritten slide for a given topic
}
```

`data` is mapped to render a list of `<Slide />` elements: all React elements generated gets the topic name injected as their first child.

If the current entry is a `customSlide`, returns it (it needs to be a `Slide` instance). Else, this is an exercise: returns a `<Slide />` with a title and an environment, instructions and notes.

## Secondary utilities

### `renderTopicsList`

Renders a `<Slide />` with the list of the workshop's topics and the number of exercises associated, based on the slides data.

If it receives an `endOfTraining` prop, topics will appear one by one.

### `parseDashedName`

Convert `advanced-graphql-wouhou` into `ADVANCED GRAPHQL WOUHOU`.

### `renderSpecificSection`

Render manually a specific section, for instance the `introduction` of the `graphql-fundamentals` workshop.

Will fail with a warning without crashing the app if the section doesn't exist.

## Build process

### Assets loader

To maximize efficiency when developing slides, we use a custom Webpack loader to use assets when developing custom slides.

This loader will replace at build time a constant `__ASSETS__` by an object containing `{ images, code, markdown }` from a the relative matching folder.

In development, we only load assets matching the current workshop.

### Fetching GitHub at build time

To avoid leaking the GitHub authentication token allowing to access the training repositories, we fetch GitHub data at build time prior to starting the dev or building the app.
