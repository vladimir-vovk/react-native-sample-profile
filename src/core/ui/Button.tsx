import React from 'react'
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native'

interface Props {
  title: string
  disabled?: boolean
  onPress?: () => void
  style: any
  inProgress?: boolean
}

interface State {
  isPressed: boolean
}

class Button extends React.PureComponent<Props, State> {
  state = {
    isPressed: false
  }

  _onPressIn = () => {
    const { disabled } = this.props
    if (disabled) {
      return
    }
    this.setState({ isPressed: true })
  }

  _onPressOut = () => {
    const { disabled, onPress } = this.props
    if (disabled) {
      return
    }
    this.setState({ isPressed: false })
    if (onPress) {
      onPress()
    }
  }

  render() {
    const { style, title, disabled, inProgress } = this.props
    const { isPressed } = this.state

    return (
      <TouchableWithoutFeedback
        onPressIn={this._onPressIn}
        onPressOut={this._onPressOut}
      >
        <View
          style={[
            styles.container,
            isPressed && styles.buttonPressed,
            disabled && styles.buttonDisabled,
            style
          ]}
        >
          {inProgress && (
            <ActivityIndicator color="white" style={styles.indicator} />
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#0088CC'
  },
  title: {
    color: 'white'
  },
  buttonPressed: {
    backgroundColor: '#325883'
  },
  buttonDisabled: {
    backgroundColor: '#CED2D5'
  },
  indicator: {
    marginRight: 8
  }
})

export default Button
