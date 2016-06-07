# Code Style

## Linting

**Every new project should contain a `.eslintrc` file in its root.**

As technologies and coding styles advance with time, each individual project can be updated with a simple refresh of the `.eslintrc` if appropriate.  This will stop old projects lighting up like a christmas tree, and still enforce good coding style.

We will stay as close to the [AirBnb style guide](https://github.com/airbnb/javascript) as possible as it has quickly become an industry standard with ~36k stars on GitHub (more than Meteor!).

## Installation & Setup

We will use the official [AirBnb eslint config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb).

Install the eslint, airbnb and meteor specific modules to the project itself (not global):

`npm install --save-dev eslint-config-airbnb eslint-plugin-import eslint-plugin-react eslint-plugin-jsx-a11y eslint eslint-import-resolver-meteor`

Copy the latest `.eslintrc` to your root:

`curl -O https://raw.githubusercontent.com/okgrow/guides/master/code_style/.eslintrc`
