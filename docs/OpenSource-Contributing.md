---
id: open-source:contributing
title: Contributing
---

👋 Welcome to the OK GROW! organization. Here are some things to keep in mind if you're contributing.

## Issues:

* If possible, link to an example app which replicates the problem.
* If it's a security issue, please email us rather than filing an issue. You can email us at hello@okgrow.com.

### Labeling system:

OK GROW! follows an issue labeling system which is described below.

#### Primary label:

All issues are to have a primary label applied.

* **bug**
  * An issue that causes a problem in the app.
* **question**
  * Asking for help (clarification or guidance) related to the specific package.
* **enhancement**
  * Feature request for the specific package.

#### Secondary label:

A secondary label will be applied once a member of OK GROW! has reviewed the issue.

* **duplicate**
  * Issue has been previously raised, this Issue will be closed and link to the original issue raised.
* **good for beginners**
  * This issue has been outlined and scoped as being good for people new to the repository to work on. Dive in and take it! If you're claiming it, state that you are in the issue, so we know that someone is working on the issue. Don't be afraid to ask questions, either.

## Pull Requests:

Pull requests are **always welcome**. We'll strive hard to prioritize PRs over issues.

* Please poke us if a PR goes ignored. We're busy, and we want to see your PR merged, but sometimes other things come up. If you feel like we've forgotten about your PR, either leave a comment on the PR or contact one of us directly.
* If possible, add tests. If the package does not yet have a test suite, you're welcome to set one up, but please ask us first before choosing a test runner. Open an issue to start the discussion.
* If changes are considerable, it is recommended to open an issue and start a discussion first, otherwise we may ask for considerable revisions before accepting.
* In general, we want packages to do one thing really well, and make other things easier for other people. If we feel that a PR spreads the focus of a package too far, we will likely not accept it. You are always welcome to fork or create your own package.
* If your PR changes the package's installation instructions, public API, or changes expected behaviour, please also update the corresponding documentation (usually README.md).
* Do not change the version number in package.js as we may not merge PRs in the same order that they are submitted.

## Code of Conduct

Please abide by the [Code of Conduct](CODE_OF_CONDUCT.md).
