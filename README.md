> How we do things at OK GROW!

To run the site locally:

```sh
cd website
yarn
yarn start
```

Edit Markdown files in the `docs` folder. No hot-reload for `docs` yet, kill & restart the server, refresh the page, your changes are here.

The guides are powered by [Docusaurus](https://docusaurus.io), short read of the docs is helpful (clear and compact docs).

To deploy:

```sh
cd website
GIT_USER=<YOUR_GITHUB_USERNAME> USE_SSH=true yarn publish-gh-pages
```
