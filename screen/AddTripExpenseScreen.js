import { Text, View, Image, TextInput,TouchableOpacity,ToastAndroid } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import BackButton from "../components/backButton";
import { colors } from "../thems";
import { useNavigation } from '@react-navigation/native';
import { ExpensCategory } from "../constants/category";
import Loading from "../components/loading";
import { addDoc } from 'firebase/firestore'
import { expensesRef } from "../config/firebase";


export default function AddTripExpenseScreen(props) {
    let {id} = props.route.params;
    console.log(props.route.params.country)
    const [title, setTitle] = React.useState('')
    const [ammount, setAmmount] = React.useState('')
    const [category, setCategory] = React.useState('')
    const [loading , setLoading] = useState(false)

    const navigation = useNavigation();

     
    console.log(category)
    const handleAddTripExpense = async() => {
        if (title && ammount && category) {
           // navigation.goBack()
          setLoading(true)
          console.log(id)
          let doc = await addDoc(expensesRef,{title,ammount,category,tripId: id})
          setLoading(false)
          if (doc && doc.id) {
            console.log(doc.id)
            navigation.goBack()
          }

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
              Add Expense
            </Text>
            <Text className={`${colors.heading} text-xs text-center`}>
              {props.route.params.country } / {props.route.params.place }
            </Text>
          </View>

          <View className="flex-row justify-center my-3 mt-5">
            <Image
              className="h-64 w-72"
              source={require("../assets/images/expenseBanner.png")}
            />
          </View>
          <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>
              For What ?
            </Text>
            <TextInput value={title} onChangeText={setTitle} className="p-2 pl-5 bg-white rounded-full mb-1" />
            <Text className={`${colors.heading} text-lg font-bold`}>
              Ammount
            </Text>
            <TextInput value={ammount} onChangeText={setAmmount} className="p-2 pl-5 bg-white rounded-full mb-1" />
            <Text className={`${colors.heading} text-lg font-bold`}>
              Category
            </Text>
              <View className="flex-row flex-wrap">
                {
                ExpensCategory.map(cat=>{
                  let bgColor = 'bg-white';
                  if (cat.value === category) bgColor = 'bg-green-200';
                  return(
                  //if cat
                    <TouchableOpacity onPress={()=>setCategory(cat.value)} key={cat.value}
                    className={`rounded-full ${bgColor} px-4 p-2 mb-1 mr-1`}>
                      <Text>{cat.title}</Text>
                    </TouchableOpacity>
                  )
                })
                }
              </View>
          </View>
        </View>

        <View>
          {
            loading ? (<Loading /> ):(
              <TouchableOpacity
                style={{ backgroundColor: colors.button }}
                className="my-6 rounded-full p-3 shadow-sm mx-2"
                onPress={handleAddTripExpense}
              >
                <Text className="text-center text-white text-lg font-bold">
                  Add Expense
                </Text>
              </TouchableOpacity>
            )
          }
            
        </View>
      </View>
    </ScreenWrapper>
  );
}
