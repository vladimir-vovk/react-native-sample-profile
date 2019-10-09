import React from 'react'
import {
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
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { inject, observer } from 'mobx-react'
import { TextInputField, Button } from '../core/ui'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { isPhoneValid, isEmailValid } from '../core/utils'

interface State {
  imageUri: string | null
  isFormValid: boolean
  isFormSaving: boolean
  currentField: string
}

interface Props {
  profileStore: any
  navigation: any
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
      firstName,
      lastName,
      phone,
      email,
      telegram,
      avatar
    } = this.props.profileStore
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

  _onSubmit = name => {
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

  _onChangeText = (text, name) => {
    this._formData[name] = text
    this._validateForm()
  }

  _isPhoneValid = phone => {
    return isPhoneValid(phone)
  }

  _isEmailValid = email => {
    return isEmailValid(email)
  }

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
    this.props.profileStore.setFirstName(firstName)
    this.props.profileStore.setLastName(lastName)
    this.props.profileStore.setPhone(phone)
    this.props.profileStore.setEmail(email)
    this.props.profileStore.setTelegram(telegram)
    this.props.profileStore.setAvatar(imageUri)

    await this.props.profileStore.save()
    this.setState({ isFormSaving: false })
    this.props.navigation.goBack()
  }

  _onConnect = () => {
    Alert.alert('', 'Connect to Telegram', [{ text: 'Got it!' }])
  }

  render() {
    const { imageUri, isFormValid, currentField, isFormSaving } = this.state
    const {
      firstName,
      lastName,
      phone,
      email,
      telegram
    } = this.props.profileStore

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.container}
          keyboardOpeningTime={0}
          bounces={false}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          extraHeight={100}
        >
          <ScrollView
            ref={ref => (this._refScroll = ref)}
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
              placeholder="First Name"
              defaultValue={firstName}
              onSubmitEditing={this._onSubmit}
              onChangeText={this._onChangeText}
              autoCompleteType="name"
              disabled={isFormSaving}
            />
            <TextInputField
              name="lastName"
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
              placeholder="Telegram"
              defaultValue={telegram}
              shouldFocus={currentField === 'telegram'}
              onSubmitEditing={this._onSubmit}
              onChangeText={this._onChangeText}
              autoCapitalize="none"
              buttonTitle="Connect"
              onButton={this._onConnect}
              disabled={isFormSaving}
            />
            <View style={styles.bottomGap} />
            <Button
              style={styles.button}
              title="Save"
              disabled={!isFormValid}
              onPress={this._onSave}
              inProgress={isFormSaving}
            />
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 24,
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
    color: '#0088CC'
  },
  bottomGap: {
    marginBottom: 32
  },
  button: {
    marginBottom: 16
  }
})

export default inject('profileStore')(observer(Profile))
