#!zsh 

. ~/.aliases.sh

undefine echodo
function echodo {
  debugharness=${DEBUG:+"zsh -v"}

  cmd=$1
  therest=($@)
  debPrint "therest=$therest"
  shift therest
  
  echo "Doing ($cmd): $therest"
  $debugHarness $cmd $therest
}

undefine echodeploy
undefine echodeployjs
function echodeployjs {
    itemDo=$1:r
    itemName=`basename $itemDo`
    DISTBIN=dist/bin
    echodo cp -v $itemDo.js $DISTBIN/$itemName
    echodo chmod +x $DISTBIN/$itemName
}

undefine newdevbranch
function newdevbranch {
    DATE=`datenow`
    BRANCHNAME='dev-'${DATE:1:10}
    echodo git branch $BRANCHNAME
}
