import React from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Keyboard,
  SafeAreaView
} from 'react-native'
import * as Permissions from 'expo-permissions' // eslint-disable-line
import * as ImagePicker from 'expo-image-picker'
import { NavigationScreenProps } from 'react-navigation-stack'
import { inject, observer } from 'mobx-react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInputField, Button } from '../core/ui'
import { isIPhoneX, isPhoneValid, isEmailValid } from '../core/utils'
import ProfileStore from './stores/ProfileStore'

interface State {
  imageUri: string | null
  isFormValid: boolean
  isFormSaving: boolean
  currentField: string
}

interface Props {
  profileStore: ProfileStore
  navigation: NavigationScreenProps
  firstName: string
  lastName: string
  phone: string
  email: string
  telegram: string
}

class Profile extends React.PureComponent<Props, State> {
  private _refScroll: ScrollView
  private _formData = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    telegram: ''
  }

  state = {
    imageUri: null,
    isFormValid: false,
    currentField: '',
    isFormSaving: false
  }

  async componentDidMount() {
    const {
      profileStore: { firstName, lastName, phone, email, telegram, avatar }
    } = this.props
    this._formData = {
      firstName,
      lastName,
      phone,
      email,
      telegram
    }
    this.setState({ imageUri: avatar })
  }

  _onAvatar = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== 'granted') {
        Alert.alert(
          '',
          'Gallery permission is not granted. Please allow access to the photo gallery for this application',
          [{ text: 'OK', onPress: () => null }]
        )
        return
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      // allowsEditing: true,
      // aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true
    })

    if (!result.cancelled) {
      this.setState({ imageUri: result.uri })
      this._validateForm()
    }
  }

  _onSubmit = (name: string) => {
    const fields = ['firstName', 'lastName', 'phone', 'email', 'telegram']
    const i = fields.indexOf(name)
    if (i < 0) {
      return
    }
    if (i === fields.length - 1) {
      this.setState({ currentField: '' })
      this._refScroll.scrollToEnd()
      return
    }
    this.setState({ currentField: fields[i + 1] })
  }

  _onChangeText = (text: string, name: string) => {
    this._formData[name] = text
    this._validateForm()
  }

  _isPhoneValid = (phone: string) => isPhoneValid(phone)

  _isEmailValid = (email: string) => isEmailValid(email)

  _validateForm = () => {
    const { firstName, lastName, phone, email, telegram } = this._formData
    const isFormValid = Boolean(
      firstName &&
        lastName &&
        this._isPhoneValid(phone) &&
        this._isEmailValid(email) &&
        telegram
    )
    this.setState({ isFormValid })
  }

  _onSave = async () => {
    this.setState({ isFormSaving: true })
    Keyboard.dismiss()

    const { imageUri } = this.state
    const { firstName, lastName, phone, email, telegram } = this._formData
    const {
      profileStore: {
        setFirstName,
        setLastName,
        setPhone,
        setEmail,
        setTelegram,
        setAvatar,
        saveProfile
      }
    } = this.props
    setFirstName(firstName)
    setLastName(lastName)
    setPhone(phone)
    setEmail(email)
    setTelegram(telegram)
    if (imageUri) {
      setAvatar(imageUri)
    }

    await saveProfile()
    const {
      navigation: { goBack }
    } = this.props
    // Emulate long operation
    setTimeout(() => {
      goBack()
    }, 2000)
  }

  _onConnect = () => {
    Alert.alert('', 'Connect to Telegram', [{ text: 'Got it!' }])
  }

  render() {
    const { imageUri, isFormValid, currentField, isFormSaving } = this.state
    const {
      profileStore: { firstName, lastName, phone, email, telegram }
    } = this.props

    return (
      <SafeAreaView style={styles.flex}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          keyboardOpeningTime={0}
          bounces={false}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          extraHeight={isIPhoneX() ? 124 : 80}
        >
          <ScrollView
            ref={ref => {
              this._refScroll = ref
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            <Text style={styles.title}>Edit Profile</Text>
            <TouchableOpacity onPress={this._onAvatar} disabled={isFormSaving}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: imageUri }} style={styles.avatar} />
                <Text style={styles.uploadPhoto}>Upload photo</Text>
              </View>
            </TouchableOpacity>
            <TextInputField
              name="firstName"
              label="First Name"
              placeholder="First Name"
              defaultValue={firstName}
              onSubmitEditing={this._onSubmit}
              onChangeText={this._onChangeText}
              autoCompleteType="name"
              disabled={isFormSaving}
            />
            <TextInputField
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              defaultValue={lastName}
              shouldFocus={currentField === 'lastName'}
              onSubmitEditing={this._onSubmit}
              onChangeText={this._onChangeText}
              autoCompleteType="name"
              disabled={isFormSaving}
            />
            <TextInputField
              name="phone"
              label="Phone"
              placeholder="Phone"
              defaultValue={phone}
              shouldFocus={currentField === 'phone'}
              onSubmitEditing={this._onSubmit}
              onChangeText={this._onChangeText}
              keyboardType="phone-pad"
              validator={isPhoneValid}
              autoCompleteType="tel"
              disabled={isFormSaving}
            />
            <TextInputField
              name="email"
              label="Email"
              placeholder="Email"
              defaultValue={email}
              shouldFocus={currentField === 'email'}
              onSubmitEditing={this._onSubmit}
              onChangeText={this._onChangeText}
              keyboardType="email-address"
              validator={isEmailValid}
              autoCapitalize="none"
              autoCompleteType="email"
              disabled={isFormSaving}
            />
            <TextInputField
              name="telegram"
              label="Telegram"
              placeholder="Telegram"
              defaultValue={telegram}
              shouldFocus={currentField === 'telegram'}
              onSubmitEditing={this._onSubmit}
              onChangeText={this._onChangeText}
              autoCapitalize="none"
              buttonTitle="Connect"
              onButton={this._onConnect}
              disabled={isFormSaving}
              style={styles.lastInput}
            />
          </ScrollView>
        </KeyboardAwareScrollView>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            title="Save"
            disabled={isFormSaving || !isFormValid}
            onPress={this._onSave}
            inProgress={isFormSaving}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginTop: 16
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 48
  },
  avatar: {
    width: 64,
    height: 64,
    marginRight: 16,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#0088CC'
  },
  uploadPhoto: {
    fontSize: 16,
    lineHeight: 20,
    color: '#0088CC'
  },
  lastInput: {
    marginBottom: 88
  },
  buttonContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    bottom: 0,
    backgroundColor: 'white',
    paddingVertical: 8
  },
  button: {
    paddingHorizontal: 16
  }
})

export default inject('profileStore')(observer(Profile))
