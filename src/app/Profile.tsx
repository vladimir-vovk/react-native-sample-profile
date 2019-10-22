import React, { useState } from 'react'
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
import i18n from 'i18n-js'
import useForm from 'react-hook-form'
import { TextInputField, Button } from '../core/ui'
import { isIPhoneX, isPhoneValid, isEmailValid } from '../core/utils'
import ProfileStore from './stores/ProfileStore'

interface Props {
  profileStore: ProfileStore
  navigation: NavigationScreenProps
  firstName: string
  lastName: string
  phone: string
  email: string
  telegram: string
}

function Profile(props: Props) {
  let refScroll: ScrollView
  const {
    profileStore: { firstName, lastName, phone, email, telegram, avatar }
  } = props

  const [imageUri, setImageUri] = useState(avatar)
  const [currentField, setCurrentField] = useState('')

  const { formState, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      firstName,
      lastName,
      phone,
      email,
      telegram,
      avatar
    }
  })

  const onAvatar = async () => {
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true
    })

    if (!result.cancelled) {
      setImageUri(result.uri)
      register({ name: 'avatar' })
      setValue('avatar', result.uri)
    }
  }

  const onSubmit = (name: string) => {
    const fields = ['firstName', 'lastName', 'phone', 'email', 'telegram']
    const i = fields.indexOf(name)
    if (i < 0) {
      return
    }
    if (i === fields.length - 1) {
      setCurrentField('')
      refScroll.scrollToEnd()
      return
    }
    setCurrentField(fields[i + 1])
  }

  const onChangeText = async (text: string, name: string) => {
    setValue(name, text, true)
  }

  const onSave = async data => {
    Keyboard.dismiss()

    const { firstName, lastName, phone, email, telegram, avatar } = data
    const { profileStore } = props
    profileStore.setFirstName(firstName)
    profileStore.setLastName(lastName)
    profileStore.setPhone(phone)
    profileStore.setEmail(email)
    profileStore.setTelegram(telegram)
    if (avatar) {
      profileStore.setAvatar(avatar)
    }

    await profileStore.saveProfile()
    const {
      navigation: { goBack }
    } = props
    // Emulate long operation
    setTimeout(() => {
      goBack()
    }, 2000)
  }

  const onConnect = () => {
    Alert.alert('', 'Connect to Telegram', [{ text: 'Got it!' }])
  }

  const uri = imageUri || null

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
            refScroll = ref
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          <Text style={styles.title}>{i18n.t('profile.title')}</Text>
          <TouchableOpacity
            onPress={onAvatar}
            disabled={formState.isSubmitted}
          >
            <View style={styles.avatarContainer}>
              <Image source={{ uri }} style={styles.avatar} />
              <Text style={styles.uploadPhoto}>{i18n.t('profile.photo')}</Text>
            </View>
          </TouchableOpacity>
          <TextInputField
            register={register}
            name="firstName"
            label={i18n.t('profile.firstName')}
            placeholder={i18n.t('profile.firstName')}
            defaultValue={firstName}
            required
            onSubmitEditing={onSubmit}
            onChangeText={onChangeText}
            autoCompleteType="name"
            disabled={formState.isSubmitted}
          />
          <TextInputField
            register={register}
            name="lastName"
            label={i18n.t('profile.lastName')}
            placeholder={i18n.t('profile.lastName')}
            defaultValue={lastName}
            required
            shouldFocus={currentField === 'lastName'}
            onSubmitEditing={onSubmit}
            onChangeText={onChangeText}
            autoCompleteType="name"
            disabled={formState.isSubmitted}
          />
          <TextInputField
            register={register}
            name="phone"
            label={i18n.t('profile.phone')}
            placeholder={i18n.t('profile.phone')}
            defaultValue={phone}
            required
            shouldFocus={currentField === 'phone'}
            onSubmitEditing={onSubmit}
            onChangeText={onChangeText}
            keyboardType="phone-pad"
            validate={isPhoneValid}
            autoCompleteType="tel"
            disabled={formState.isSubmitted}
          />
          <TextInputField
            register={register}
            name="email"
            label={i18n.t('profile.email')}
            placeholder={i18n.t('profile.email')}
            defaultValue={email}
            shouldFocus={currentField === 'email'}
            onSubmitEditing={onSubmit}
            onChangeText={onChangeText}
            keyboardType="email-address"
            validate={isEmailValid}
            autoCapitalize="none"
            autoCompleteType="email"
            disabled={formState.isSubmitted}
          />
          <TextInputField
            register={register}
            name="telegram"
            label={i18n.t('profile.telegram')}
            placeholder={i18n.t('profile.telegram')}
            defaultValue={telegram}
            required
            shouldFocus={currentField === 'telegram'}
            onSubmitEditing={onSubmit}
            onChangeText={onChangeText}
            autoCapitalize="none"
            buttonTitle="Connect"
            onButton={onConnect}
            disabled={formState.isSubmitted}
            style={styles.lastInput}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          title={i18n.t('profile.save')}
          disabled={
            formState.isSubmitted || !formState.isValid || !formState.dirty
          }
          onPress={handleSubmit(onSave)}
          inProgress={formState.isSubmitted}
        />
      </View>
    </SafeAreaView>
  )
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
    paddingVertical: 8,
    marginBottom: isIPhoneX() ? 16 : 0
  },
  button: {
    paddingHorizontal: 16
  }
})

export default inject('profileStore')(observer(Profile))
