import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native'
import { inject, observer } from 'mobx-react'
import * as Animatable from 'react-native-animatable'
import ProfileIcon from '../core/ui/icons/Profile'

type Props = {
  navigation: any
  profileStore: any
}

const AVATAR_SIZE = Dimensions.get('window').width / 2.5
const MARGIN = Dimensions.get('window').width / 18

class Welcome extends React.PureComponent<Props> {
  static navigationOptions = {
    header: null
  }

  _onAvatar = () => {
    this.props.navigation.navigate('Profile')
  }

  render() {
    const { firstName, avatar } = this.props.profileStore
    const message = firstName ? `Welcome back ${firstName}!` : 'Welcome!'

    return (
      <View style={styles.container}>
        <Animatable.View animation="fadeInDown" style={styles.inner}>
          <TouchableOpacity onPress={this._onAvatar}>
            <View style={styles.avatar}>
              {avatar ? (
                <Image style={styles.image} source={{ uri: avatar }} />
              ) : (
                <ProfileIcon width={AVATAR_SIZE} height={AVATAR_SIZE} />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.message}>{message}</Text>
          {!firstName && (
            <Text style={styles.help}>
              Tap on the image to set up you profile
            </Text>
          )}
        </Animatable.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    marginBottom: MARGIN,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: AVATAR_SIZE - 16,
    height: AVATAR_SIZE - 16,
    borderRadius: (AVATAR_SIZE - 16) / 2
  },
  message: {
    fontSize: 42,
    fontWeight: '200',
    marginBottom: MARGIN * 2,
    paddingHorizontal: 16,
    textAlign: 'center'
  },
  help: {
    marginTop: 64,
    paddingHorizontal: 16,
    textAlign: 'center'
  }
})

export default inject('profileStore')(observer(Welcome))
