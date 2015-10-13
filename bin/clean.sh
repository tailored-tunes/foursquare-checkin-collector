#!/bin/sh

CURRENT_BRANCH=git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/\1/'

CHANGED=$(git diff-index --name-only HEAD --)


if [ -n "$CHANGED" ]; then
    echo "You have uncommitted changes. Commit them before rerunning"
    exit 0;
fi

git fetch -p
git checkout master &&
for r in $(git for-each-ref refs/heads --format='%(refname:short)')
do
echo "$r"
  if [ x$(git merge-base master "$r") = x$(git rev-parse --verify "$r") ]
  then
    if [ "$r" != "master" ]
    then
      git branch -d "$r" 2> /dev/null
    fi
  fi
done
if [ "$1" == "force" ]
then
  git clean -Xd -f --exclude='!developer.ini' --exclude='!.idea'
fi

git checkout "$CURRENT_BRANCH"
