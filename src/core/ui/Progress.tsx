import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'

const WIDTH = 16
const BORDER_WIDTH = 2

interface Props {
  width?: number
  borderWidth?: number
  color?: string
  backgroundColor?: string
  duration?: number
  style?: React.CSSProperties
}

export default ({
  width,
  borderWidth,
  color,
  backgroundColor,
  duration,
  style
}: Props) => {
  const [rotateAnim] = useState(new Animated.Value(0))
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: duration || 1000,
        easing: Easing.linear
      })
    ).start()
  }, [])

  const innerWidth = width || WIDTH
  const innerBorderWidth = borderWidth || BORDER_WIDTH
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  return (
    <Animated.View style={[{ transform: [{ rotate }] }, style]}>
      <View
        style={[
          styles.outer,
          width && {
            width,
            height: width,
            borderRadius: width / 2,
            borderWidth: width / 2
          },
          color && { borderColor: color },
          backgroundColor && { borderTopColor: backgroundColor }
        ]}
      />
      <View
        style={[
          styles.inner,
          (borderWidth || width) && {
            top: innerBorderWidth,
            left: innerBorderWidth,
            width: innerWidth - innerBorderWidth * 2,
            height: innerWidth - innerBorderWidth * 2,
            borderRadius: (innerWidth - innerBorderWidth * 2) / 2
          },
          backgroundColor && { backgroundColor }
        ]}
      />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  outer: {
    width: WIDTH,
    height: WIDTH,
    borderRadius: WIDTH / 2,
    borderWidth: WIDTH / 2,
    borderColor: '#0088CC',
    borderTopColor: 'white'
  },
  inner: {
    position: 'absolute',
    top: BORDER_WIDTH,
    left: BORDER_WIDTH,
    width: WIDTH - BORDER_WIDTH * 2,
    height: WIDTH - BORDER_WIDTH * 2,
    borderRadius: (WIDTH - BORDER_WIDTH * 2) / 2,
    backgroundColor: 'white'
  }
})
