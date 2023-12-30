import { View, Text, TouchableOpacity,Alert } from 'react-native'
import React, { useState } from 'react'
import { colors, categoryBG } from '../thems'
import { getFirestore, doc, deleteDoc } from 'firebase/firestore'




export default function ExpenseCard({item, change}) {
  //console.log(item)
  const handleDelete2 = () => {
    console.log(item.id)
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => removeExpense(item.id),
        },
      ],
      { cancelable: false }
   );

   const removeExpense = () => {
    console.log(item.id)
    const db = getFirestore(); 
    const docRef = doc(db, "expenses", item.id);
    deleteDoc(docRef) .then(() => { change(); console.log("Entire Document has been deleted successfully.") }) .catch(error => { console.log(error); })
   }
  }
  
  return (
    <View style={{backgroundColor: categoryBG[item.category]}}  className="flex-row justify-between items-center p-3 mb-3 rounded-2xl">
    <View>
      <Text className={`${colors.heading} font-bold`}>{item.title}</Text>
      <Text className={`${colors.heading} text-xs`}>{item.category}</Text>
    </View>
    <View className>
      <Text>Rp {item.ammount}</Text>
    </View>
    <View className>
      <TouchableOpacity onPress={() => handleDelete2()}
        className="text-white font-bold rounded-2xl items-center back bg-red-500 p-2"
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}