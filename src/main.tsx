/**
 * @jest-environment jsdom
 */
import { StrictMode } from 'react' 
import _styles from './index.css'

import { App } from './App.js'
import { doDebug, DebugLog } from 'glvlib/DebUtils.js'
import { log, logging } from 'glvlib/logging.js'

// import { logging } from 'glvlib/logging.js'

export interface ButtonOptions {
    sid: string,
    url: string,
    nmButton: string
}
export interface LogHandler {
    (s: string[] | string): void
}
export interface ButtonOptionsWithLog extends ButtonOptions {
  log: LogHandler,
  debLog?: LogHandler
}

const nmButton = "buttonTest"
const NewSession = (_: string) => _;
let myLog = logging.getLogger(nmButton);

let debLog = new DebugLog(myLog);
const debPrint = (doDebug) 
    ? (s: string) => {debLog.getLog().debug(s)}
    : () => null

const dummyOpts: ButtonOptionsWithLog = {
  url: 'http://localhost/login',
  sid: NewSession('demonWeed'),
  nmButton,
  log: (s)=> {log(!Array.isArray(s) ? s : s.join('\n'))
  debLog: (_s: string) => {}
  }
};

export const ButtonTest = (opts?: ButtonOptionsWithLog) => {
    const { sid, url, nmButton, log} = { ...dummyOpts, ...opts }
    log(`Entering ${nmButton}`)
    debPrint("Here's the link ${url}?sid=${sid}")
    return <StrictMode>
        <p>Here's the link {url}?sid={sid}</p>
        <App />
    </StrictMode>;
}
