import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store, wrapper } from '../lib/store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default wrapper.withRedux(MyApp)
