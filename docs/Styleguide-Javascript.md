---
id: styleguide:javascript
title: JavaScript
---

We practice and preach the usage of [ECMAScript 2015 (ES6)](http://www.ecma-international.org/ecma-262/6.0/) here at OK GROW!

Checkout the differences between ES6 & ES5 [here](http://es6-features.org/).

Need help with transitioning to es6, [check out](https://github.com/okgrow/guides/blob/master/style-guide/code-style/javascript/transitioning-to-es6.md) our helpful guide to transitioning your Meteor codebase to es6 standards.

## Linting

**Every new project should contain a `.eslintrc` file in its root.**

As technologies and coding styles advance with time, each individual project can be updated with a simple refresh of the `.eslintrc` if appropriate. This will stop old projects lighting up like a christmas tree, and still enforce good coding style.

We will stay as close to the [Airbnb style guide](https://github.com/airbnb/javascript) as possible as it has quickly become an industry standard with ~36k stars on GitHub (more than Meteor!).

## Installation & Setup

We will use the official [Airbnb eslint config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).

Install the eslint, airbnb and meteor specific modules to the project itself (not global):

`npm install --save-dev eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint eslint-import-resolver-meteor`

NOTE: If you get [peer dependency errors](https://github.com/airbnb/javascript/issues/952) use this instead:

`npm install --save-dev eslint@\^2.10.2 eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y@\^1.2.2 eslint-import-resolver-meteor`

Copy the latest `.eslintrc` to your root:

`curl -O https://raw.githubusercontent.com/okgrow/guides/master/style-guide/code-style/javascript/.eslintrc`
