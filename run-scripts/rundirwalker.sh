#!zsh --norcs
#
# Facility: test process
# File: rundirwalker.sh - Exercise dir-walker with a bunch of test cases that correspond 
#     to the jest suite in package.json that runs in npm 
#
# wrg 20250218
#
. ~/.zshrc

CWD=`pwd`
FILE=$1
FILENAME=`basename $FILE .ts`
DIST=$WORKSPACE/dist
DN=`dirname $FILE`
if [[ $DN != '.' ]] ; then
    SUBDIR=`basename $DN`
else
    SUBDIR=`basename $CWD`
fi

echo "In $SUBDIR, Doing: tsc $1 && mv $FILENAME{.js,} && chmod +x $FILENAME"
echo Has these files:
ls -latr ${SUBDIR}/${FILENAME}*
debPrint "cp -v $DN/${FILENAME}* $DIST/$SUBDIR/"
cp -v $DN/$FILENAME* $DIST/$SUBDIR


function dothisnext() {
    echo "CWD=$CWD; $DIST/src/dir-walker $*"
    $DIST/src/dir-walker $*
}


TEST1="--summary -L 3 --exclude \"^.git$\" \"node_modules\" -d test/testing_folder"
TEST2="--summary -L 4 -r --exclude '^.git$' -d test/testing_folder"
TEST3="--summary -L 3 -r --exclude '^.git$' -d test/testing_folder"

wksp; echo `pwd`
echo Do this next:

# dothisnext "$TEST3"
