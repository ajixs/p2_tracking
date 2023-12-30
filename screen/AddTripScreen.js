import { Text, View, Image, TextInput,TouchableOpacity,ToastAndroid } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import BackButton from "../components/backButton";
import { colors } from "../thems";
import { useNavigation } from '@react-navigation/native';
import Loading from "../components/loading";
import { useSelector } from 'react-redux'
import { addDoc } from "firebase/firestore";
import { tripsRef } from "../config/firebase";

export default function AddTripScreen() {
    const [place, setPlace] = React.useState('')
    const [country, setCountry] = React.useState('')
    const navigation = useNavigation();
    const [loading , setLoading] = useState(false)
    const {user} = useSelector(state=>state.user);

    const handleAddTrip = async() => {
        if (place && country) {
            
            setLoading(true)
            let doc =await addDoc(tripsRef,{place,country,userId:user.uid})
            if (doc && doc.id) {
              navigation.navigate('Home')
              console.log(doc)
            }
            setLoading(false)
        }else{
          ToastAndroid.show('Fill all the fields', ToastAndroid.SHORT);
        }
    }

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="relative mt-5">
            <View className="absolute top-0 left-0 z-10">
              <BackButton />
            </View>

            <Text className={`${colors.heading} text-xl font-bold text-center`}>
              Add Trip
            </Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-72 w-72"
              source={require("../assets/images/4.png")}
            />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>
              Where On Earth?
            </Text>
            <TextInput value={place} onChangeText={setPlace} className="p-4 bg-white rounded-full mb-3" />
            <Text className={`${colors.heading} text-lg font-bold`}>
              Which Country
            </Text>
            <TextInput value={country} onChangeText={setCountry} className="p-4 bg-white rounded-full mb-3" />
          </View>
        </View>

        <View>
          {
            loading ? (<Loading /> ):(
              <TouchableOpacity
                style={{ backgroundColor: colors.button }}
                className="my-6 rounded-full p-3 shadow-sm mx-2"
                onPress={handleAddTrip}
                >
                <Text className="text-center text-white text-lg font-bold">
                  Add Trip
                </Text>
              </TouchableOpacity>
            )
          }
            
        </View>
      </View>
    </ScreenWrapper>
  );
}
