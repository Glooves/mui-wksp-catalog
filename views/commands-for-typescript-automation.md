typescript
# Command to move key files in a project to a duplicate/copy project:
cp -pr globals.d.ts index*html tsconfig.*json webpack.config.js $WORKSPACE

# Command to show all the files in a project from a directory list that excludes .git and node_modules
list_files_by_date.pl `dir-walker -r | grep -v ENOENT:` | uniq | tee /tmp/mui-wksp-catalog-try2.lst