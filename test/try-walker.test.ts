#!node
// file: test/try-walker.test.ts -- exercises walker with commands to find workspace directories 
//   that have README.md and .git subdirs.
//

import { echoDoCmd } from 'glvlib'
import { log } from 'glvlib/logging'
import { doDebug, debPrint } from 'glvlib/DebUtils'

const firstCmd = 'walker -r -m .md$ "\\.tsx?$" .pug$ -e node_modules{,-} testing_folder .git --summary ../categorizer'

const showDoCmd = (s: string | Array<string>): string[] => {
    let lines = [];
    const todo = Array.isArray(s) ? s : [s];
    log(`Showing: ${s}`);

    let ret: string[] = [];
    try {
        todo.map(_ => ret.push(echoDoCmd(_)));
    }
    catch (e: Error | any) {
        ret.push(e.message);
    }
    return ret.join('\n\n').split(/\n/); 
}

debPrint(`This is my first Command: ${firstCmd}`)
const saw = showDoCmd(firstCmd).join('\n')
const isError = saw.includes('Error: Command failed')
if (saw.includes('Command failed: ') ) {
    let tr: boolean = saw.includes(`walker -r`);
    tr = saw.includes("error: unknown option '-r'") 
    log(`${tr}, saw expected unknown option error: -r `)
}

const cdWorkspace = `cd ~/workspaces; `
const scriptToRun = `walker `

const matchThese = `-m README.md$ .git `
const excludeTheseAlways = `-e node_modules local_package_overrides `
const excludeThese = `-e {react-eg-,mwp_,wkspc_}node_modules BOOKS testing_folder config `

const awkSub = `
    function basename(file) {
        sub(".*/", "", file)
    return file
    }
`

const pipeAwk = "| awk '" + awkSub 
+ "/.git\//  { line = $0; print basename($1), $1, \" \", $3 }"
+ "/README.md/ { print $0 } '"

const pipeAwk2 = ` | awk \'
function find_index(array, string, num_elements) {
    for (i = 1; i <= num_elements; i++) {
      if (array[i] == string) {
        return i
      }
    }
    return -1 # Return -1 if not found
}

/.git\\//  { len = split($0, line, "/"); 
    x = find_index(line, ".git", len); 
    print line[x-1] "," line[x] } 
/README.md/ { len = split($0, line, "/"); 
    x = find_index(line, "README.md", len); 
    print line[x-1] "," line[x] } \'`; 

const pipeLs = ` ls -Fd * | grep / | tr -d / ;`


const pipeSortUniq = ' | sort -f | uniq';
const command1 = cdWorkspace + pipeLs + scriptToRun + excludeTheseAlways + excludeThese + matchThese + '-- ';
const command2 = pipeAwk2 + pipeSortUniq ; 
let cmdSeqNo = 0;


interface CmdSpec {
    name: string,
    cmdToDo: string | Array<string>,
    expectError?: undefined | ((arg: any) => boolean)
};

interface RunResult {
    cmdSeqNo: number,
    successP: boolean,
    output: string,
    cmd: string
};

const runTheseCommands = (cmds: CmdSpec[]): RunResult[] => {
    const results: RunResult[] = cmds.map(({name, cmdToDo, expectError}) => { 
        const thisRun: RunResult = {
            cmdSeqNo: cmdSeqNo++,
            output: "",
            successP: !expectError,
            cmd: Array.isArray(cmdToDo) ? cmdToDo.join('\n') : cmdToDo
        }
        if (doDebug) log(`Doing ${name} ${cmdSeqNo}`)
        thisRun.output = showDoCmd(cmdToDo).join('\n')
        thisRun.successP = !!expectError && expectError(thisRun.output)
        return thisRun; 
    })
    return results;
}

const cmdOnly = (s: string): CmdSpec => { return {name: s.substring(0, 13), cmdToDo: s} }
const cmds: Array<CmdSpec>= [
//    {name: 'firstCmd', cmdToDo: firstCmd, expectError: (_: any) => {return true}},  
//    cmdOnly('cd ~/workspaces; walker -m README.md$ '
//        + '-e {,react-eg-,mwp_,wkspc_}node_modules BOOKS testing_folder nginx-configs local_package_overrides config .git --'),
    {name: 'src-git-names', 
        cmdToDo: 'cd ~/workspaces; walker -m README.md$ .git '
        + '-e {,react-eg-,mwp_,wkspc_}node_modules BOOKS testing_folder nginx-configs local_package_overrides config -- '
    },
//    {name: 'filter .git for wksp names #1', cmdToDo: command1},
   {name: 'filter .git for wksp names #2', cmdToDo: command1 + command2}
]

// runTheseCommands([cmdOnly(firstCmd)]);
const combined: string = runTheseCommands(cmds).map(_ => {
    return _.output
}).join('\n');

log(combined);

const wksps = `
GlvLib,.git
GlvLib,README.md
built-art,.git
built-art,README.md
categorizer,.git
categorizer,README.md
company-0.9.13,README.md
coreui-free-react-admin-template,.git
coreui-free-react-admin-template,README.md
docker-practice,README.md
first-app,README.md
glvlib,README.md
heartbeat,.git
heartbeat,README.md
home-files,.git
home-files,README.md
httpie.api,.git
mongoose-user-trial1,.git
mongoose-user-trial1,README.md
more_webpack_practice,.git
more_webpack_practice,README.md
nextjs-mui-practice,.git
nextjs-mui-practice,README.md
react-admin-learning,README.md
react-example-vite,README.md
reactTCG-ch04-test,README.md
robjob,.git
robjob,README.md
stage_test,.git
stage_test,README.md
todo-tasks,.git
todo-tasks,README.md
web-mode-17.3.3,README.md
`;

const sortedDirs = `
BOOKS
Custis 60 greeting
GlvLib
built-art
categorizer
compose-kubuntu-vnc
coreui-free-react-admin-template
docker-practice
getssl-setup
heartbeat
home-files
httpie.api
mongoose-user-trial1
more_webpack_practice
mwp_node_modules
nextjs-mui-practice
node_modules
play-tdd
react-admin-learning
react-eg-node_modules
react-example-vite
reactTCG-ch04-test
robjob
stage_test
todo-tasks
wksp-catalog
wkspc_node_modules
`;

const wkspDirs = `
built-art,.git
built-art,README.md
categorizer,.git
categorizer,README.md
company-0.9.13,README.md
coreui-free-react-admin-template,.git
coreui-free-react-admin-template,README.md
docker-practice,README.md
first-app,README.md
GlvLib,.git
GlvLib,README.md
glvlib,README.md
heartbeat,.git
heartbeat,README.md
home-files,.git
home-files,README.md
httpie.api,.git
mongoose-user-trial1,.git
mongoose-user-trial1,README.md
more_webpack_practice,.git
more_webpack_practice,README.md
nextjs-mui-practice,.git
nextjs-mui-practice,README.md
react-admin-learning,README.md
react-example-vite,README.md
reactTCG-ch04-test,README.md
robjob,.git
robjob,README.md
stage_test,.git
stage_test,README.md
todo-tasks,.git
todo-tasks,README.md
web-mode-17.3.3,README.md
`;



