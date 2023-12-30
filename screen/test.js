import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function TestX({change}) {
  return (
    <View>
      <TouchableOpacity onPress={() => change()}
        className="text-white font-bold rounded-2xl mb-3 items-center back bg-red-500 p-2"
      >
        <Text>Delete</Text>
      </TouchableOpacity>

    </View>
  )
}