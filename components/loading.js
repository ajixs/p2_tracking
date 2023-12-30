import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { colors } from '../thems'

export default function Loading() {
  return (
    <View className="flexrow justify-center p-y-8">
        <ActivityIndicator size="large" color={colors.button}/>
    </View>
  )
}