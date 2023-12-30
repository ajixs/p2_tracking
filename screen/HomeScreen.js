import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import React, { useEffect } from 'react'
import { colors } from '../thems'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../components/emptyList'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import {signOut} from 'firebase/auth'
import { auth, tripsRef } from '../config/firebase'
import { useSelector } from 'react-redux'
import { query, where, getDocs } from 'firebase/firestore'


const items = [
    {
        id : 1,
        place : 'Bali',
        country: 'Indonesia',
    },
]


// home screen aplikasi 
export default function HomeScreen() {
    const navigation = useNavigation();
    const {user} = useSelector(state=>state.user);
    const [trips, setTrips] = React.useState([]);
    const isFocused = useIsFocused();

    const fetchTrips = async() => {
        const  q = query(tripsRef,where('userId','==',user.uid));
        let data = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            //console.log("Document data:", doc.data());
            data.push({...doc.data(), id:doc.id});
        })
        setTrips(data);
    }

    useEffect(() => {
        if(isFocused)
            fetchTrips();
    },[isFocused]);

    const handleSignOut = async() => {
        await signOut(auth);
    }
  return (
    <ScreenWrapper className="flex-1">
        <View className = "flex-row justify-between items-center p-1">
            <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>Expnezz</Text>
            <TouchableOpacity onPress={handleSignOut} className="p-2 px-3 bg-white border border-gray-200 rounded-full ">
                <Text className={`${colors.heading}`}>Logout</Text>
            </TouchableOpacity>
        </View>
        <View className="flex-row justify-center items-center bg-blue-200 rounded-xl ">
            <Image source={require('../assets/images/banner.png')} className="w-60 h-60"/>
        </View>
        <View className="px-4 py-2 space-y-3">
            <View className="flex-row justify-between items-center">
                <Text className={`${colors.heading} font-bold text-xl`}>Recent Trips</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddTrip')} className="p-2 px-3 bg-white border border-gray-200 rounded-full ">
                    <Text className={`${colors.heading}`}>Add Trip</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ height:350}}>
            <FlatList 
                data={trips}
                numColumns={2}
                keyExtractor={item=>item.id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<EmptyList message="you don't have any trips yet"/>}
                columnWrapperStyle={{
                    justifyContent : 'space-between'
                }}
                className="mx1"
                renderItem={({item})=>{
                    return (
                        <TouchableOpacity className="bg-white p-3 rounded-2xl mb-2 shadow-sm"  onPress={() => navigation.navigate('TripExpense',{...item})}>
                            <View className="items-center">
                                <Image source={randomImage()} className="w-36 h-36 mb-2 mt"/>
                                <Text className="text-lg font-bold">{item.place}</Text>
                                <Text className="text-gray-500">{item.country}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }}
                />
        </View>
    </ScreenWrapper>
  )
}