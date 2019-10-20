import { observable, action } from 'mobx'
import { AsyncStorage } from 'react-native'

export default class ProfileStore {
  @observable firstName = ''
  @observable lastName = ''
  @observable phone = ''
  @observable email = ''
  @observable telegram = ''
  @observable avatar = ''

  @action saveProfile = async () => {
    try {
      await AsyncStorage.setItem('ProfileStore:firstName', this.firstName)
      await AsyncStorage.setItem('ProfileStore:lastName', this.lastName)
      await AsyncStorage.setItem('ProfileStore:phone', this.phone)
      await AsyncStorage.setItem('ProfileStore:email', this.email)
      await AsyncStorage.setItem('ProfileStore:telegram', this.telegram)
      if (this.avatar) {
        await AsyncStorage.setItem('ProfileStore:avatar', this.avatar)
      }
    } catch (e) {
      console.log('Error save profile', e)
    }
  }

  @action loadProfile = async () => {
    try {
      this.firstName = await AsyncStorage.getItem('ProfileStore:firstName')
      this.lastName = await AsyncStorage.getItem('ProfileStore:lastName')
      this.phone = await AsyncStorage.getItem('ProfileStore:phone')
      this.email = await AsyncStorage.getItem('ProfileStore:email')
      this.telegram = await AsyncStorage.getItem('ProfileStore:telegram')
      this.avatar = await AsyncStorage.getItem('ProfileStore:avatar')
    } catch (e) {
      console.log('Error load profile', e)
    }
  }

  @action setFirstName = (firstName: string) => {
    this.firstName = firstName
  }

  @action setLastName = (lastName: string) => {
    this.lastName = lastName
  }

  @action setPhone = (phone: string) => {
    this.phone = phone
  }

  @action setEmail = (email: string) => {
    this.email = email
  }

  @action setTelegram = (telegram: string) => {
    this.telegram = telegram
  }

  @action setAvatar = (avatar: string) => {
    this.avatar = avatar
  }
}
