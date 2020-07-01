@ECHO off
SETLOCAL EnableDelayedExpansion

git flow init -d >NUL 2>NUL

git config gitflow.branch.master "master"
git config gitflow.branch.develop "develop"
git config gitflow.prefix.feature "feature/"
git config gitflow.prefix.bugfix "bugfix/"
git config gitflow.prefix.release "release/"
git config gitflow.prefix.hotfix "hotfix/"
git config gitflow.prefix.support "support/"
git config gitflow.prefix.versiontag "v"

CALL :echof Branch name for production releases:, git config gitflow.branch.master
CALL :echof Branch name for "next release" development:, git config gitflow.branch.develop
CALL :echof Feature branches:, git config gitflow.prefix.feature
CALL :echof Bugfix branches:, git config gitflow.prefix.bugfix
CALL :echof Release branches:, git config gitflow.prefix.release
CALL :echof Hotfix branches:, git config gitflow.prefix.hotfix
CALL :echof Support branches:, git config gitflow.prefix.support
CALL :echof Version tag prefix:, git config gitflow.prefix.versiontag
CALL :echof Hooks and filters directory:, git config gitflow.path.hooks

PAUSE

EXIT /B %ERRORLEVEL%

:echof
SET P=%*
SET I=1
SET "P!I!=%P:,=" & SET /A I+=1 & SET "P!I!=%"
FOR /F "tokens=*" %%g IN ('%P2%') do (SET VAR=%%g)
ECHO %P1% %VAR%
EXIT /B 0
