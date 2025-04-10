

import {
    styled,
    Container as MuiContainer,
    ContainerProps,
  } from '@mui/material'
  
  const Container = styled(MuiContainer)<ContainerProps>(({ theme }) => ({
    '.MuiContainer-root': {
      padding: '10px',
      backgroundColor: 'red',
    },
  }))
  
  export default Container