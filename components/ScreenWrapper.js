import { Platform, StatusBar, Text, View } from 'react-native'
import React from 'react'

export default function ScreenWrapper({children}) {
    // untuk mengatur tinggi status bar dan sebagai kontrolnya 
    let statusBarHeight = StatusBar.currentHeight? StatusBar.currentHeight : Platform.OS === 'ios' ? 20 : 10;
    return (
      <View style={{paddingTop: statusBarHeight , paddingLeft: 10, paddingRight: 10}} >
        {children}
      </View>
    )
}