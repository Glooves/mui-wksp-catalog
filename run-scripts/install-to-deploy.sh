#!zsh --norcs
#
# Install this package's artifact scripts into /opt/bin
#
#
. ~/.zshrc

name='/tmp/opt'

export EXPORT_DIR=$name
export SCRIPT_DIR="${name}/bin"
export NODE_MODULES_DIR="more_webpack_practice"

wasWorkspace=`basename ${WORKSPACE}`
localOverrides='local_package_overrides'

debPrint Doing new package export to $name and $SCRIPT_DIR
rm -rf $name

echo mkdir -p $EXPORT_DIR $SCRIPT_DIR 
mkdir -p $EXPORT_DIR 
mkdir -p $SCRIPT_DIR 

function copyScript() {
    pkg=$1
    pkgPath="packages/$pkg"
    [[ $2 ]] && pkgPath="$2"
    debPrint Doing package: $pkgPath $pkg to $SCRIPT_DIR
    echo "cp -p $pkgPath/$pkg{.js,}; cp -p $pkgPath/$pkg{,.*} $SCRIPT_DIR && chmod 775 $SCRIPT_DIR/$pkg"
    cp -p $pkgPath/$pkg{.js,}; cp -p $pkgPath/$pkg{,.*} $SCRIPT_DIR && chmod 775 $SCRIPT_DIR/$pkg
    ls -l $SCRIPT_DIR/$pkg
}

function copyNodeModules() {
    debPrint providing node_modules from $NODE_MODULES_DIR for $EXPORT_DIR
    wksp $NODE_MODULES_DIR

    echo rsync -rlt node_modules $EXPORT_DIR/
    rsync -rlt node_modules $EXPORT_DIR/
    debPrint "The $EXPORT_DIR/node_modules tree has `tree $EXPORT_DIR | tee /tmp/opt-tree | wc -l` lines."
}

function ccopyScript() {
  echo "Function name: $0"
  echo "Number of arguments: $#"
  echo "First argument: $1"
  echo "Second argument: $2"
  echo "All arguments: $@"
}

function doGlvLib() {
    wksp GlvLib
    name='glvlib'
    tsc
    run-scripts/make-package.ts
    cp -pv ${name}/${name}-*.tgz ~/workspaces/built-art
    rsync -rltv --mkpath ./${name} ../$localOverrides/
    rsync -rltv ../$localOverrides $EXPORT_DIR/
    pushd $EXPORT_DIR/node_modules 
    [[ -d glvlib ]] && echo glvlib is a module subdir, not a local overrides link && mv glvlib{,-}
    [[ -L glvlib ]] && rm node_modules/glvlib
    ln -s ../$localOverrides/glvlib .
    popd
}

function do_more_webpack_practice() {
    name=more_webpack_practice
    wksp $name
    npm run clean
    echo NOT DOING: npm install # But it could go here
    npm run build
    rsync -rltv $name $EXPORT_DIR/

    copyScript walker
    copyScript pug2html
}

function do_dir-walker() {
    name=categorizer
    wksp $name
    npm run clean
    npm run build
    mv dist $name
    copyScript dir-walker src
}

copyNodeModules
doGlvLib
do_more_webpack_practice
do_dir-walker
echo Done

wksp $wasWorkspace
