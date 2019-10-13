import React from 'react'
import { StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons' // eslint-disable-line

export default function BackButton() {
  return (
    <Ionicons
      name="ios-arrow-round-back"
      size={32}
      color="#0088CC"
      style={styles.button}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 18
  }
})
