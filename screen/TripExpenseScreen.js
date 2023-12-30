import { View, Text, TouchableOpacity, Image, FlatList, ToastAndroid, Alert } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper'
import React, { useEffect, useState } from 'react'
import { colors } from '../thems'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../components/emptyList'
import { useNavigation,useIsFocused } from '@react-navigation/native'
import BackButton from "../components/backButton";
import ExpenseCard from '../components/expenseCard'
import { getDocs, query, where, getFirestore, doc, deleteDoc } from 'firebase/firestore'
import { expensesRef } from "../config/firebase";
import Testx from './test'

const items = [
    {
        id: 1,
        title: 'ate sandwitch',
        amount: 4,
        category: 'food'
      },
      {
        id: 2,
        title: 'ate sandwitch',
        amount: 4,
        category: 'food'
      },
]


// home screen aplikasi 
export default function TripExpense(props) {
    const navigation = useNavigation();
    const {id, place, country} = props.route.params
    console.log(props.route.params)

    const [expenses, setExpenses] = useState([]);
    const isFocused = useIsFocused();

    const fatchExpenses = async() => {
        const  q = query(expensesRef, where('tripId','==',id));
        let data = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            //console.log("Document data:", doc.data());
            data.push({...doc.data(), id:doc.id});
        })
        setExpenses(data);
        console.log(data.length)
    }
    

    function handleState() {
        console.log("test OK")
        fatchExpenses();
        ToastAndroid.show("Data Suscessfully Deleted", ToastAndroid.SHORT);

     }

     const handleDeleteTrips = async(id) => {
        
         Alert.alert(
            'Delete Expense',
            'Are you sure you want to delete this Trip?',
            [
              {
                text: 'Cancel',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () =>  deleteTripFirebase(),
              },
            ],
            { cancelable: false }
         );
     }
     const deleteTripFirebase = () => {
        if (expenses.length !== 0)
            return ToastAndroid.show("Trip is not empty", ToastAndroid.SHORT);
        
        const db = getFirestore(); 
        const docRef = doc(db, "trips", id);
        deleteDoc(docRef) .then(() => { 
            console.log("Entire Document has been deleted successfully.");
            navigation.goBack();
            }) .catch(error => { console.log(error); })
    }

    useEffect(() => {
        if(isFocused)
            fatchExpenses();
    },[isFocused]);



return (
    <ScreenWrapper className="flex-1">
        <View className="relative mt-5">
            <View className="absolute top-0 left-0 z-10">
              <BackButton />
            </View>

            <Text className={`${colors.heading} text-xl font-bold text-center`}>
              Add Expense
            </Text>
            <Text className={`${colors.heading} text-xs text-center`}>
              {country} / {place}
            </Text>
        </View>

        <View className="flex-row justify-center items-center rounded-xl ">
            <Image source={require('../assets/images/7.png')} className="w-80 h-60"/>
        </View>
        <View className="px-4 py-2 space-y-3">
            <View className="flex-row justify-between items-center">
                <Text className={`${colors.heading} font-bold text-xl`}>Recent Trips</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddTripExpense', {id, place, country})} className="p-2 ml-10 px-3 bg-white border border-gray-200 rounded-full ">
                    <Text className={`${colors.heading}`}>Add Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteTrips(id)} className="p-2 bg-red-500 border border-gray-200 rounded-full ">
                    <Text className={`${colors.heading}`}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ height:390}}>
            <FlatList 
                data={expenses}
                //numColumns={2}
                keyExtractor={item=>item.id}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<EmptyList message="you don't have any trips yet"/>}
                //columnWrapperStyle={{
                //    justifyContent : 'space-between'
                //}}
                className="mx1"
                renderItem={({item})=>{
                    return (
                        <ExpenseCard item={item} change={handleState} />
                    )
                }}
                />
        </View>
    </ScreenWrapper>
  )
}