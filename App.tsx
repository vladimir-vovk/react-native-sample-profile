import React from 'react'
import { Provider } from 'mobx-react'
import AppContainer from './src/app/Router'
import stores from './src/app/stores'

export default function App() {
  return (
    <Provider {...stores}>
      <AppContainer />
    </Provider>
  )
}
