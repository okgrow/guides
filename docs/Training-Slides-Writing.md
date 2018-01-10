---
id: training:slides:writing
title: Writing slides for a workshop
---

The slides are based on an ejected [`create-react-app`](https://github.com/facebookincubator/create-react-app).

This gives us powerful tooling that we enhance to fit our needs.

## App structure

Below, a diagram of an expanded view of the app structure along with a corresponding screenshot.

**🔖 When writing slides for a workshop, your focus is only on what is inside the `src/<workshop directory>` related to your workshop.**

For instance, `src/advanced-graphql` or `src/graphql-fundamentals`.

![directory structure](/guides/img/training/directory-structure.png)

## Writing slides

Slides are written to match a topic used in exercises.

To add slides to a given topic, create a JS file named _exactly_ like the topic, for instance `simple-query-on-the-client.js`. This file should export as default a list of React elements wrapped in the Spectacle's `<Slide />` element.

**To maximize readability and enforce consistency, we recommend to use a utility function called `renderSlide` that is located in the `utils` folder.**

This function allows you to create slide with a title, markdown content, code snippets or custom React elements!

Here is an example of slides on a topic:

```js
// Import React, only needed if you use JSX, like below with the `element` property
import React from 'react';

// Import Spectacle Core tags
import { Image } from 'spectacle';

// Import the utility function to render workshop slide
import { renderSlide } from '../utils';

// note: this constant is transformed at build time by a custom Webpack loader
// eslint-disable-next-line
const { markdown, code, images } = __ASSETS__;

// a list of slides
export default [
  renderSlide({
    // title of the slide
    title: 'Using a Model',
    // custom element, here an image
    element: <Image src={images.model} />,
  }),
  renderSlide({
    title: 'Using a Model',
    // code snippet, default to javascript
    code: code.modelUsage,
  }),
  renderSlide({
    title: 'Create Place Mutation',
    // markdown content
    markdown: markdown.example,
  }),
  renderSlide({
    title: 'Bonus: Variable as an Input Type',
    // code snippet with options
    code: {
      source: code.inputType,
      lang: 'graphql',
      // add a badge
      env: 'api',
    },
  }),
];
```

Take inspiration on the existing slides to create your own! 😉

## Importing assets

You may have notice that we get our assets from… a constant?! 🤔

```js
// note: this constant is transformed at build time by a custom Webpack loader
// eslint-disable-next-line
const { markdown, code, images } = __ASSETS__;
```

On an earlier version of the training slides, we were requiring each asset by hand. This lead to huge list of `require` statements on top of each topic's slide file and it was easy to have a mistake.

We now use a custom `assets-loader` in our webpack build to automatically match a topic's slide file with the related assets folder (see diagram above, look how a file name matches a directory name in `assets`).

This help us to achieve such diffs, here for `apollo-link` topic in `advanced-graphql`.

```diff
- // Assets requirements is going to be abstracted to avoid long relative paths
- const markdown = {
-   goal: require('./assets/apollo-link/goal.md'),
-   apolloClient1: require('./assets/apollo-link/apolloClient1.md'),
-   apolloClient2: require('./assets/apollo-link/apolloClient2.md'),
-   concept: require('./assets/apollo-link/concept.md'),
- };
-  
- const code = {
-   apolloClient1: require('./assets/apollo-link/apolloClient1'),
-   apolloClient2: require('./assets/apollo-link/apolloClient2'),
-   terminatingLink: require('./assets/apollo-link/terminatingLink'),
-   nonTerminatingLink: require('./assets/apollo-link/nonTerminatingLink'),
-   additiveComposition: require('./assets/apollo-link/additiveComposition'),
-   directionalComposition: require('./assets/apollo-link/directionalComposition'),
- };
-  
- const images = {
-   additiveComposition: require('./assets/apollo-link/additiveComposition.png'),
-   directionalComposition: require('./assets/apollo-link/directionalComposition.png'),
- };
+ // note: this constant is transformed at build time by a custom Webpack loader
+ // eslint-disable-next-line
+ const { markdown, code, images } = ASSETS;
```
