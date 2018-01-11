---
id: performance-meteor
title: Performance - Meteor
sidebar_label: Meteor
---

This document was created to help ensure that we do not fall victim to common mistakes, gotcha’s or assumptions whilst reviewing an existing production app or completing pre-production launch checks. You will always be surprised by what you might find. :)

**NOTE**: This document is a work in progress and is not an exhaustive checklist. Please add any checks that you believe are missing.

Don't forget to review our [Meteor - Security checklist](https://github.com/okgrow/guides/tree/master/security-meteor).

## Client

* [ ] Subscriptions - Cache subscriptions where necessary ([e.g. subs-manager](https://github.com/kadirahq/subs-manager))

## Server

* [ ] Publications - ensure that the minimum number of documents is published.
* [ ] Publications - ensure that unused/unnecessary fields in a document are not published.

## Mongo

* [ ] Queries - All queries should only return the fields that are used/needed.
* [ ] Indexes - ensure Mongo indexes are being used optimally.
* [ ] Replication Set - TODO: explain this in more detail.
* [ ] Mongo Oplog Tailing - TODO: explain this in more detail.

## TODO:

Add best practices for Methods.
