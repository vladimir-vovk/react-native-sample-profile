import React from 'react'
import { Provider } from 'mobx-react'
import * as Localization from 'expo-localization'
import i18n from 'i18n-js'
import AppContainer from './src/app/Router'
import stores from './src/app/stores'
import { en, ru } from './locales'

i18n.defaultLocale = 'en'
i18n.fallback = true
i18n.translations = { en, ru }
const [locale] = Localization.locale.split('-')
i18n.locale = locale

export default function App() {
  return (
    <Provider {...stores}>
      <AppContainer />
    </Provider>
  )
}
