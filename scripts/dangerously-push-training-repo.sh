#!/bin/bash

set -e # exit if any command fails


BRANCHES="react-fundamentals graphql-fundamentals advanced-graphql"

echo "⚠️ WARNING! This will FORCE PUSH and wipe out the remote history on:"
for BRANCH in $BRANCHES ; do
  echo "🔥 $BRANCH"
done

echo "Abort now if anyone else has changed those branches since you last pulled!"
echo "Press enter to continue."
read || exit

if [ ! -z "$(git status --porcelain)" ]; then
  echo "Git working directory is not clean."
  exit 1
fi

function force-push() {
  echo "🔥 Force pushing $1..."
  git checkout $1
  git push --force origin $1
}

for BRANCH in $BRANCHES ; do
  force-push $BRANCH
done
