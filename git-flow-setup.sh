#!/usr/bin/env bash

git flow init -d >> /dev/null 2>&1

git config gitflow.branch.master "master"
git config gitflow.branch.develop "develop"
git config gitflow.prefix.versiontag "v"
git config gitflow.prefix.feature "feature/"
git config gitflow.prefix.bugfix "bugfix/"
git config gitflow.prefix.release "release/"
git config gitflow.prefix.hotfix "hotfix/"
git config gitflow.prefix.support "support/"

echo "Branch name for production releases: $(git config gitflow.branch.master)"
echo "Branch name for \"next release\" development: $(git config gitflow.branch.develop)"
echo "Feature branches: $(git config gitflow.prefix.feature)"
echo "Bugfix branches: $(git config gitflow.prefix.bugfix)"
echo "Release branches: $(git config gitflow.prefix.release)"
echo "Hotfix branches: $(git config gitflow.prefix.hotfix)"
echo "Support branches: $(git config gitflow.prefix.support)"
echo "Version tag prefix: $(git config gitflow.prefix.versiontag)"
echo "Hooks and filters directory: $(git config gitflow.path.hooks)"
