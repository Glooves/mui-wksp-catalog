#!zsh
#
# File: do_test_packages_tsc.sh - compile a test suite in tests/packages
. ~/.aliases.sh
wksp
type debPrint

BASEPGM=$1
TESTPGM=$BASEPGM.test
PGM=$TESTPGM

DISTTEST=$WORKSPACE/dist/test
TSCARGS=("--declaration" "--declarationMap")
TSCCMD=("tsc")

echo $SHELL
echo WD=`pwd`

echodo $TSCCMD $TSCARGS $PGM.ts

echodo cp $PGM.js $PGM
echodo chmod +x $PGM
[[ -d $DISTTEST ]] || echodo mkdir -p $DISTTEST
echodo cp $PGM* $DISTTEST
echo hi rob;
