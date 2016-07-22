# Meteor - Performance & Security

This document was created to help ensure that we do not fall victim to common mistakes, gotcha’s or assumptions whilst reviewing an existing production app or completing pre-production launch checks. You will always be surprised by what you might find. :)

**NOTE**: This document is a work in progress and is not an exhaustive checklist. Please add any checks that you believe are missing.

## Performance

#### Client
- [ ] Subscriptions - Cache subscriptions where necessary ([e.g. subs-manager](https://github.com/kadirahq/subs-manager))

#### Server
- [ ] Publications - ensure that the minmum number of documents is published.
- [ ] Publications - ensure that unused/unecessary fields in a document are not published.

#### Mongo
- [ ] Queries - All queries should only return the fields that are used/needed.
- [ ] Indexes - ensure Mongo indexes are being used optimally.
- [ ] Replication Set - TODO: explain this in more detail.
- [ ] Mongo Oplog Tailing - TODO: explain this in more detail.

## Security

#### General
- [ ] Keys - Ensure that private keys or secret API tokens are not stored in version control. (.git, .svn). Common place to store them instead: `settings.json`.

#### Client
- [ ] Passwords - ensure passwords aren’t transmitted in clear text (e.g. as parameters in Method calls).

#### Server
- [ ] Profile - Review the ```meteor.user.profile``` field. By default meteor accounts makes this field editable by the user and published to all other users.
- [ ] Private fields - Ensure private fields like passwords are not published.  Tip: You can specify which fields to exclude: e.g [` fields: { secretKey: 0, fbSecret: 0 }`](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/#return-all-but-the-excluded-field).


## TODO:

Add best practices for Methods.






