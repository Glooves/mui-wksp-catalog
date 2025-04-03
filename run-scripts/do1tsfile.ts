#!node
import { echoDoCmd } from 'glvlib';
import { debPrint } from 'glvlib/DebUtils';
import { log } from 'glvlib/logging';

const argv: Array<string> = process.argv;
debPrint(`argv: ${JSON.stringify(argv)}`);

export const do1TscFile = 'tsc -d --declarationMap --sourceMap --esModuleInterop';
let f: string;
let iMin = argv[0].includes('ions/node/v') ? 2 : 1;

for (let i = iMin; i < argv.length; i++) {
    f = argv[i];
    echoDoCmd(`${do1TscFile} ${f}`);
}
