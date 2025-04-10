// import React from 'react'
import { createRoot } from "react-dom/client"

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { log } from 'glvlib/logging'
import { NewSessionID } from './sessionid.js'

interface ButtonUsageAttrs {
    nmButton: string,
    sid: string
}
console.log("Reading the HelloRob Component")

const ButtonUsage = ({ nmButton }: ButtonUsageAttrs) => {
    log(`ButtonUsage ${nmButton}`)
    return <Button variant="contained">
        Hello ${nmButton}
      </Button>;
}

export const HelloRob = (buttonInfo: ButtonUsageAttrs ) => {
    return <Container>
        <Box>
            <Typography>
                <ButtonUsage {...buttonInfo} />
            </Typography>
        </Box>
    </Container>
}


const container = document.getElementById('root');
const root = createRoot(container!);
const btnDeet: ButtonUsageAttrs = {
    nmButton: 'HelloRob',
    sid: NewSessionID()
}

root.render(<HelloRob {...btnDeet} />)

export default HelloRob
