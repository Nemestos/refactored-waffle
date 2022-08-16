import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import { store, wrapper } from '../lib/store'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default wrapper.withRedux(MyApp)
