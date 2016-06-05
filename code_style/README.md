# Code Style

## Linting

**Every new project should contain a `.eslintrc` file in its root.  We will keep an up-to-date starting point for this file in this repo.**

We will stay as close to the [AirBnb style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) as possible as it has quickly become an industry standard with ~36k stars on GitHub (more than Meteor!).

## Installation & Setup

Install the eslint, airbnb and meteor specific modules to the project itself (not global):

```
npm install --save-dev eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint eslint-import-resolver-meteor
```

Copy the latest `.eslintrc` to your root:

```
https://raw.githubusercontent.com/okgrow/guides/master/code_style/.eslintrc
```