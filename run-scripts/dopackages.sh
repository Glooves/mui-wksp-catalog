#!zsh
. $WORKSPACE/run-scripts/run-scripts-aliases.sh

WD=`pwd`
[[ ! $WD =~ 'packages$' ]] &&
  echo ""$WD is not a packages directory. cd to the packages directory and retry"" &&
  exit

for dir in *; do
    if [ -f "$dir/package.json" ]; then
        echodo cd $dir
        echodo npm run tsc
    fi
done
