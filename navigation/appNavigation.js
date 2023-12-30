import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/HomeScreen';
import AddTripScreen from '../screen/AddTripScreen';
import TripExpense from '../screen/TripExpenseScreen';
import AddTripExpenseScreen from '../screen/AddTripExpenseScreen';
import WelcomeScreen from '../screen/WelcomeScreen';
import SignUpScreen from '../screen/SignUpScreen';
import SignInscreen from '../screen/SignInScreen';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../redux/slices/user';

const Stack = createNativeStackNavigator();
export default function AppNavigation() {

    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();

    onAuthStateChanged(auth, u=>{
        console.log('got user',u)
        dispatch(setUser(u))
    })


    if (!user) {
        return (
            //untuk navigasi pada aplikasi
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen options={{ headerShown: false, }} name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen options={{ headerShown: false, presentation: 'modal'}} name="SignIn" component={SignInscreen} />
                    <Stack.Screen options={{ headerShown: false, presentation: 'modal' }} name="SignUp" component={SignUpScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
    return (
        //untuk navigasi pada aplikasi
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
                <Stack.Screen options={{ headerShown: false }} name="AddTrip" component={AddTripScreen} />
                <Stack.Screen options={{ headerShown: false }} name="TripExpense" component={TripExpense} />
                <Stack.Screen options={{ headerShown: false }} name="AddTripExpense" component={AddTripExpenseScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}