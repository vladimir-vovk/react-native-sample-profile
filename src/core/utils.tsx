import { ScaledSize, Dimensions, Platform } from 'react-native'

const EMAIL_RE = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}'
const PHONE_RE = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

export function isEmailValid(email: string) {
  const re = new RegExp(EMAIL_RE)
  return re.test(email) && email.split('@').length === 2
}

export function isPhoneValid(phone: string) {
  const re = new RegExp(PHONE_RE)
  return re.test(phone)
}

export function isIPhoneX() {
  const dim = Dimensions.get('window')

  return (
    // This has to be iOS
    Platform.OS === 'ios'
    // Check either, iPhone X or XR
    && (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  )
}

export function isIPhoneXSize(dimensions: ScaledSize) {
  return dimensions.height === 812 || dimensions.width === 812
}

export function isIPhoneXrSize(dimensions: ScaledSize) {
  return dimensions.height === 896 || dimensions.width === 896
}
