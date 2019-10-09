import React from 'react'
import { AppLoading, SplashScreen } from 'expo'
import { inject, observer } from 'mobx-react'

interface Props {
  profileStore: any
  navigation: any
}

class Loading extends React.Component<Props> {
  constructor(props) {
    super(props)

    SplashScreen.preventAutoHide()
  }

  async componentDidMount() {
    try {
      await this.props.profileStore.load()
    } catch (error) {
      console.log('Error restore data:', error.message)
    }

    this.props.navigation.navigate('Welcome')
  }

  render() {
    return <AppLoading />
  }
}

export default inject('profileStore')(observer(Loading))
