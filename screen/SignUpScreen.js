import { View, Text, TextInput, TouchableOpacity, Image,ToastAndroid } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../thems'
import { useNavigation } from '@react-navigation/native'
import BackButton from '../components/backButton'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import {  setUserLoading } from '../redux/slices/user'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/loading'

export default function SignUpScreen() {
    const navigation = useNavigation()
    const [email , setEmail] = React.useState('')
    const [password , setPassword] = React.useState('')
    const [confirmpassword , setConfirmPassword] = React.useState('')
    const {userLoading} = useSelector(state=>state.user);
    const dispatch = useDispatch();

    const handleSignup = async() =>{
        if(email && password && confirmpassword){
            if (password !== confirmpassword){
                ToastAndroid.show('Password does not match!', ToastAndroid.SHORT);
                return
            }
            try{
                dispatch(setUserLoading(true));
                await createUserWithEmailAndPassword(auth,email,password)
                dispatch(setUserLoading(false));
            }catch(err){
                dispatch(setUserLoading(false));
                ToastAndroid.show(err.message, ToastAndroid.SHORT);
            }
            //navigation.navigate('Home')
        }else{
            ToastAndroid.show('Fill all the fields', ToastAndroid.SHORT);
        }
    }
  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
            <View className="relative">
                <View className="absolute top-0 left-0 z-10">
                    <BackButton />
                </View>
                
                <Text className={`${colors.heading} text-xl font-bold text-center`}>Sign Up</Text>
            </View>
            
            <View className="flex-row justify-center my-3 mt-5">
                <Image className="h-60 w-80" source={require('../assets/images/signup.png')} />
            </View>
            <View className="space-y-2 mx-2">
                <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
                <TextInput value={email} onChangeText={setEmail} className="p-3 pl-5 bg-white rounded-full mb-3" />
                <Text  className={`${colors.heading} text-lg font-bold`}>Password</Text>
                <TextInput value={password} secureTextEntry onChangeText={setPassword}  className="p-3 pl-5 bg-white rounded-full mb-3" />
                <Text  className={`${colors.heading} text-lg font-bold`}>Repeat Password</Text>
                <TextInput value={confirmpassword} secureTextEntry onChangeText={setConfirmPassword}  className="p-3 pl-5 bg-white rounded-full mb-3" />
            </View>
        </View>
        
        <View>
            {
                userLoading ? (<Loading /> ):(
                    <TouchableOpacity onPress={()=> handleSignup()}  style={{backgroundColor: colors.button}} className="mt-5 mb-20 rounded-full p-3 shadow-sm mx-2">
                        <Text className="text-center text-white text-lg font-bold">Sign Up</Text>
                    </TouchableOpacity>
                )
            }
        </View>
      </View>
    </ScreenWrapper>
)
  
}