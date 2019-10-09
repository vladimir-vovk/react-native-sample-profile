import React from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardType
} from 'react-native'

interface Props {
  name?: string
  defaultValue?: string
  placeholder?: string
  onChangeText?: (text: string, name: string) => void
  onSubmitEditing?: (name: string) => void
  style?: any
  shouldFocus?: boolean
  keyboardType?: KeyboardType
  validator?: (value: string) => boolean
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  autoCompleteType?: string
  buttonTitle?: string
  onButton?: () => void
  disabled?: boolean
}

interface State {
  isFocused: boolean
  isValid: boolean
  inputHeight: number
  buttonWidth: number
  buttonHeight: number
}

class TextInputField extends React.PureComponent<Props, State> {
  private _ref: TextInput
  state = {
    isFocused: false,
    isValid: true,
    inputHeight: 0,
    buttonWidth: 0,
    buttonHeight: 0
  }

  _onChangeText = (text: string) => {
    const { validator, onChangeText, name } = this.props
    const { isValid } = this.state

    if (onChangeText) {
      onChangeText(text, name)
    }
    if (validator) {
      if (text) {
        this.setState({ isValid: validator(text) })
      } else {
        if (!isValid) {
          this.setState({ isValid: true })
        }
      }
    }
  }

  _onSubmitEditing = () => {
    const { onSubmitEditing, name } = this.props
    if (onSubmitEditing) {
      onSubmitEditing(name)
    }
  }

  componentDidUpdate(prevProps) {
    const { shouldFocus: prevShouldFocus } = prevProps
    const { name, shouldFocus } = this.props
    if (shouldFocus && !prevShouldFocus) {
      this._ref.focus()
    }
  }

  _onFocus = () => {
    this.setState({ isFocused: true })
  }

  _onBlur = () => {
    this.setState({ isFocused: false })
  }

  _onInputLayout = event => {
    const {
      nativeEvent: {
        layout: { height }
      }
    } = event
    this.setState({ inputHeight: height })
  }

  _onButtonLayout = event => {
    const {
      nativeEvent: {
        layout: { width: buttonWidth, height: buttonHeight }
      }
    } = event
    this.setState({ buttonWidth, buttonHeight })
  }

  _onButton = () => {
    const { onButton } = this.props
    if (onButton) {
      onButton()
    }
  }

  render() {
    const {
      autoCompleteType,
      autoCapitalize,
      keyboardType,
      defaultValue,
      placeholder,
      style,
      buttonTitle,
      disabled
    } = this.props
    const {
      buttonWidth,
      buttonHeight,
      inputHeight,
      isValid,
      isFocused
    } = this.state

    return (
      <View>
        <TextInput
          onLayout={this._onInputLayout}
          ref={ref => (this._ref = ref)}
          defaultValue={defaultValue}
          placeholder={placeholder}
          selectionColor="black"
          style={[
            styles.input,
            isFocused && styles.focused,
            !isValid && styles.invalid,
            disabled && styles.disabled,
            style,
            buttonTitle && { paddingRight: buttonWidth }
          ]}
          onChangeText={this._onChangeText}
          onSubmitEditing={this._onSubmitEditing}
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCompleteType={autoCompleteType}
          editable={!disabled}
        />
        {buttonTitle && (
          <TouchableOpacity
            onPress={this._onButton}
            style={{
              position: 'absolute',
              right: 0,
              top: inputHeight / 2 - buttonHeight / 2
            }}
            onLayout={this._onButtonLayout}
          >
            <Text style={styles.button}>{buttonTitle}</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: 8,
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#DDE1E2',
    width: '100%',
    fontSize: 18
  },
  focused: {
    borderBottomColor: '#0088CC'
  },
  invalid: {
    borderBottomColor: 'red'
  },
  disabled: {},
  button: {
    color: '#0088CC',
    fontSize: 16
  }
})

export default TextInputField
