import { extendTheme } from '@chakra-ui/react'
import components from './components'
import foundations from './foundations'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
}

const fonts = {
  heading: `'Open Sans', sans-serif`,
  body: `'Open Sans', sans-serif`
}

const theme = extendTheme({
  config,
  ...foundations,
  components,
  fonts
})

export { theme }
