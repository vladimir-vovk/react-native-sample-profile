import React from 'react'
import { View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

interface Props {
  width?: number
  height?: number
  rotate?: number
  style?: React.CSSProperties
}

export default function ProfileIcon({
  width = 48,
  height = 48,
  rotate = 0,
  style = {}
}: Props) {
  return (
    <View style={style}>
      <Svg rotation={rotate} width={width} height={height} viewBox="0 0 48 48">
        <Path fill="#ede7f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z" />
        <Path
          fill="#4e342e"
          d="M24,44c4.669,0,8.955-1.613,12.358-4.295C34.647,35.388,31.153,31,24,31s-10.647,4.388-12.358,8.705C15.045,42.387,19.33,44,24,44z"
        />
        <Path
          fill="#8d6e63"
          d="M15 11l5 5-7 5c0 0-1-1.516-1-4C12 13.257 15 11 15 11zM33 11l-5 5 7 5c0 0 1-1.516 1-4C36 13.257 33 11 33 11z"
        />
        <Path
          fill="#8d6e63"
          d="M24,14C9.921,14,10,31,10,31s3.948,6,14,6s14-6,14-6S38.079,14,24,14z"
        />
        <Path
          fill="#ef9a9a"
          d="M35.284 20.457C35.58 19.812 36 18.616 36 17c0-3.743-3-6-3-6l-1.486 5.202C33.148 17.352 34.37 18.852 35.284 20.457zM16.486 16.202L15 11c0 0-3 2.257-3 6 0 1.616.42 2.812.716 3.457C13.63 18.852 14.852 17.352 16.486 16.202z"
        />
        <Path
          fill="#5d4037"
          d="M24,31c0,0-0.156,3-3,3c0,0,0.789,1,3,1c2.242,0,3-1,3-1C24.031,34,24,31,24,31z"
        />
        <Path fill="#263238" d="M24 32L22 30 22 29 26 29 26 30z" />
        <Path
          fill="#ffeb3b"
          d="M33 22c0 0 .596 6-3.54 6C27.551 28 26 28 26 28s-.231-6 4-6C31.911 22 33 22 33 22zM22.002 28c0 0 .596-6-3.54-6-1.909 0-3.46 0-3.46 0s-.231 6 4 6C20.913 28 22.002 28 22.002 28z"
        />
        <Path
          fill="#212121"
          d="M31 25c0 1.657-1.5 3-1.5 3S28 26.657 28 25s1.5-3 1.5-3S31 23.343 31 25zM20.002 25c0-1.657-1.5-3-1.5-3s-1.5 1.343-1.5 3 1.5 3 1.5 3S20.002 26.657 20.002 25z"
        />
      </Svg>
    </View>
  )
}
