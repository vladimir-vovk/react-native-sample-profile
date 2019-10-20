import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { BackButton } from '../core/ui'
import Loading from './Loading'
import Welcome from './Welcome'
import Profile from './Profile'

const App = createStackNavigator(
  {
    Welcome,
    Profile
  },
  {
    defaultNavigationOptions: {
      headerBackImage: BackButton,
      headerBackTitle: null,
      headerStyle: { borderBottomWidth: 0, height: 56 }
    }
  }
)

const RootStack = createSwitchNavigator({
  Loading,
  App
})

export default createAppContainer(RootStack)
