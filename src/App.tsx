// const __webpack_public_path__ = process.env.ASSET_PATH
import { useState, Fragment } from 'react'

import * as _css from  './App.css'

import { ScopedCssBaseline } from '@mui/material'
// import { HelloRob } from "./HelloRob.js"
import Button from '@mui/material/Button';
 
// ignore unused for now ...
import _ReactLogo from './react.svg' 
import _ViteLogo from './vite.svg'

interface SessionType {
    id: string,
    sid: string,
    state: string,
    type: string,
    title?: string,
    details?: string[]
    sesData: object
}

export const App = () => {
    const [count, setCount] = useState(0)
    const [_session, _setSession] = useState({
      id: "solo1", 
      sid: "deadpool",
      state: "active",
      type: "solomente",
      sesData: {}
    } as SessionType)

/*
  const _viteLogo = ViteLogo
  const _reactLogo = ReactLogo
  const _hill2 = ''

        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={hill2+viteLogo.toString()} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo.toString()} className="logo react" alt="React logo" />
          </a>
        </div>
    
*/
    return (
      <Fragment><ScopedCssBaseline>
        <p className="read-the-docs">Click on the composition logos to learn more</p>
        <h1>Vite + React</h1>
        <div className="card">
          <Button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </ScopedCssBaseline></Fragment>
    )
}

// export default App
