import React from 'react'
import { AppLoading, SplashScreen } from 'expo'
import { NavigationScreenProps } from 'react-navigation-stack'
import { inject, observer } from 'mobx-react'
import ProfileStore from './stores/ProfileStore'

interface Props {
  profileStore: ProfileStore
  navigation: NavigationScreenProps
}

class Loading extends React.Component<Props> {
  constructor(props: Props) {
    super(props)

    SplashScreen.preventAutoHide()
  }

  async componentDidMount() {
    try {
      const {
        profileStore: { loadProfile }
      } = this.props
      await loadProfile()
    } catch (error) {
      console.log('Error restore data:', error.message)
    }

    const {
      navigation: { navigate }
    } = this.props
    navigate('Welcome')
  }

  render() {
    return <AppLoading />
  }
}

export default inject('profileStore')(observer(Loading))
