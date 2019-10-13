import React from 'react'
import { TouchableWithoutFeedback, View, StyleSheet, Text } from 'react-native'
import Progress from './Progress'

interface Props {
  title: string
  disabled?: boolean
  onPress?: () => void
  style?: React.CSSProperties
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

    let backgroundColor = '#0088CC'
    if (disabled) {
      backgroundColor = '#CED2D5'
    } else if (isPressed) {
      backgroundColor = '#325883'
    }

    return (
      <View style={style}>
        <TouchableWithoutFeedback
          onPressIn={this._onPressIn}
          onPressOut={this._onPressOut}
        >
          <View
            style={[
              styles.container,
              isPressed && styles.buttonPressed,
              disabled && styles.buttonDisabled
            ]}
          >
            {inProgress && (
              <Progress
                color="white"
                backgroundColor={backgroundColor}
                style={styles.indicator}
              />
            )}
            <Text style={styles.title}>{title}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
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
    color: 'white',
    fontSize: 16,
    lineHeight: 20
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
