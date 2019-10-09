import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Loading from './Loading'
import Welcome from './Welcome'
import Profile from './Profile'

const App = createStackNavigator({
  Welcome,
  Profile
})

const RootStack = createSwitchNavigator({
  Loading,
  App
})

export default createAppContainer(RootStack)
