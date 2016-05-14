Code Style
==========

We're attempting to converge on a standard [ESLint](http://eslint.org/) config
that we all use in order to help prevent bugs
and make sure that we have consistent code style.

To use our ESLint config file right from this repo,
check out the repo and do the following at a command-line.
WARNING this will overwrite your current ``~/.eslintrc.json` if you have one.

`ln -s THIS_REPO/code_style/dot-eslintrc.json ~/.eslintrc.json`

To install eslint: `npm install -g eslint eslint-plugin-meteor eslint-plugin-react eslint-config-airbnb`

Atom setup:

1. Install linter-eslint package
1. In package settings set "Global Node Installation Path" and "Use global ESLint installation"
