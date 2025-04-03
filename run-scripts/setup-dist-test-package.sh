#!/zsh --norcs
#
# Facility: test harnesses
# File: setup-dist-test-packages.sh - Prepare a single test executable from
# a package subdir to run in $WORKSPACE/dist/test
#
# wrg 20250218
#
. ~/.zshrc

export WD=`pwd`

undefine echoDo
echoDo () {
  debugharness=${DEBUG:+"zsh -v"}

  cmd=$1
  therest=$@

  echo "Doing ($cmd): $therest"
  eval $($debugHarness  $cmd $therest)
}

wksp # This also changes the PATH to include $WORKSPACE/run-scripts

echo cd packages; zsh ../run-scripts/setup-dist-test-package.sh gfs/dir-wa
filename = `basename $1 .ts`
targetTestDir=$WORKSPACE/dist/test
SUBDIR=`dirname $filename`
export G=`pwd`"/test/packages/$SUBDIR"


echoDo "pushd $targetTestDir; cp $G/$filename.js ."
echoDo "chmod +x $filename; popd"

echo "$targetTestDir has: "
list_files_by_date.pl $targetTestDir

