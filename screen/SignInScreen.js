import { View, Text, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../thems'
import { useNavigation } from '@react-navigation/native'
import BackButton from '../components/backButton'
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import {  setUserLoading } from '../redux/slices/user'
import Loading from '../components/loading'




export default function SignInscreen() {

    const navigation = useNavigation()
    const [email , setEmail] = React.useState('')
    const [password , setPassword] = React.useState('')
    const {userLoading} = useSelector(state=>state.user);
    const dispatch = useDispatch();

    const handleSignIn =  async() =>{
        if(email && password){
            try{
                dispatch(setUserLoading(true));
                await signInWithEmailAndPassword(auth,email,password)
                dispatch(setUserLoading(false));
            }catch(err){
                dispatch(setUserLoading(false));
                ToastAndroid.show(err.message, ToastAndroid.SHORT);
            }
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
                    
                    <Text className={`${colors.heading} text-xl font-bold text-center`}>Sign In</Text>
                </View>
                
                <View className="flex-row justify-center my-3 mt-5">
                    <Image className="h-80 w-80" source={require('../assets/images/login.png')} />
                </View>
                <View className="space-y-2 mx-2">
                    <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
                        <TextInput value={email} onChangeText={setEmail}  className="p-4 bg-white rounded-full mb-3" />
                    <Text  className={`${colors.heading} text-lg font-bold`}>Password</Text>
                        <TextInput value={password} secureTextEntry onChangeText={setPassword} className="p-4 bg-white rounded-full mb-3" />
                    <TouchableOpacity className="flex-row justify-end">
                        <Text>Forget Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        
            <View>
                {
                    userLoading ? (<Loading /> ):(
                        <TouchableOpacity onPress={handleSignIn}  style={{backgroundColor: colors.button}} className="my-6 rounded-full p-3 shadow-sm mx-2">
                            <Text className="text-center text-white text-lg font-bold">Sign In</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
        </View>
    </ScreenWrapper>
)
  
}