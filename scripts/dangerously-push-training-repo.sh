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

for BRANCH in $BRANCHES ; do
  echo "🔥 Force pushing $BRANCH..."
  git checkout $BRANCH
  git push --force origin $BRANCH
done
