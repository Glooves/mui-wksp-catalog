#!zsh --norcs
. ~/.zshrc

workspace categorizer
echo `datenow` Getting a list of directories in $WORKSPACE
node $WORKSPACE/dist/src/dir-walker.js --exclude '^.git$' --exclude 'node_modules$' $*
