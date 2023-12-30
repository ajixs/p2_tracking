import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../thems'
import { useNavigation } from '@react-navigation/native'

const WelcomeScreen = () => {
    const navigation = useNavigation()
  return (
    <ScreenWrapper>
    <View className="h-full flex justify-around">
      <View className="flex-row justify-center mt-10">
          <Image source={require('../assets/images/welcome.gif')} className="h-96 w-96 shadow" />
      </View>
      <View className="mx-5 mb-20">
          <Text className={`text-center font-bold text-4xl ${colors.heading} mb-10`}>Expnezz</Text>
          
          <TouchableOpacity onPress={()=> navigation.navigate('SignIn')} className="shadow p-3 rounded-full mb-5" style={{backgroundColor: colors.button}}>
              <Text className="text-center text-white text-lg font-bold">Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate('SignUp')} className="shadow p-3 rounded-full mb-5" style={{backgroundColor: colors.button}}>
              <Text className="text-center text-white text-lg font-bold">Sign Up</Text>
          </TouchableOpacity>
          {/*  *
          <TouchableOpacity onPress={()=> signIn()} className="shadow p-3 rounded-full bg-white" >
            <View className="flex-row justify-center items-center space-x-3">
              <Image source={require('../assets/images/googleIcon.png')} className="h-8 w-8" />
              <Text className="text-center text-gray-600 text-lg font-bold">Sign In with Google</Text>
            </View>
          </TouchableOpacity>
        */}
      </View>
    </View>
  </ScreenWrapper>
  )
}

export default WelcomeScreen