/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{useState,useEffect} from 'react';
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   StatusBar,
 } from 'react-native';
 import {  DefaultTheme,Provider as PaperProvider } from 'react-native-paper';
 import 'react-native-gesture-handler';
 import { NavigationContainer ,DefaultTheme as DefaultThemeNav} from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import LoginScreen from './screens/LoginScreen'
 import SignupScreen from './screens/SignupScreen'
 import CreateAdScreen from './screens/CreateAdScreen'
 import HomeScreen from './screens/ListItemScreen'
 import AccountScreen from './screens/AccountScreen'
 import Feather from 'react-native-vector-icons/Feather'
 import auth from '@react-native-firebase/auth'
 
 //app theme
 
 const theme = { 
   ...DefaultTheme,
   roundness: 2,
   colors: {
     ...DefaultTheme.colors,
     primary: '#CC5500',
   },
 };
 const MyTheme = {
   ...DefaultThemeNav,
   colors: {
     ...DefaultThemeNav.colors,
     background: 'white',
   },
 };
 
 //stack navigator is used for login and signup screen
 //tab navigator is used for the other screens
 //ui is conditionally rendered based on whether a user is logged in or not
 
 const Stack = createStackNavigator()
 const Tab = createBottomTabNavigator();
 const AuthNavigator = ()=>{
   return(
      <Stack.Navigator>
         <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}}/>
         <Stack.Screen name="signup" component={SignupScreen} options={{headerShown:false}} />
       </Stack.Navigator>
   )
 }
 
 
 const TabNavigator = ()=>{
  return(
    <Tab.Navigator
    screenOptions={({ route }) => ({
     tabBarIcon: ({ color }) => {
       let iconName;
 
       if (route.name === 'Home') {
         iconName = 'home'
       
       } else if(route.name==='create'){
         iconName = 'plus-circle'
       }else if (route.name==='account'){
         iconName = "user"
       }
 
   
       return <View style={{/*borderWidth:15,*/borderColor:"white",borderRadius:30}}><Feather name={iconName} size={35} color={color} /></View>
     },
     
   })}
   tabBarOptions={{
     activeTintColor: '#CC5500',
     inactiveTintColor: 'gray',
   }}
    
    >
      
     <Tab.Screen name="Home" component={HomeScreen} options={{title:""}}/>
     <Tab.Screen name="create" component={CreateAdScreen}  options={{title:""}} />
     <Tab.Screen name="account" component={AccountScreen}  options={{title:""}} />
   
   </Tab.Navigator>
  ) 
 }
 
 const Navigation = ()=>{
   const [user,setUser] = useState('')
   useEffect(()=>{
     const unsubscribe =  auth().onAuthStateChanged((userExist)=>{
       if(userExist){
            setUser(userExist)
 
            userExist.getIdToken().then(jwt=>{
 
            })
       }else{
            setUser("")
       }
     })
     return unsubscribe
   },[])
   return(
     <NavigationContainer theme={MyTheme}>
         {user?<TabNavigator />:<AuthNavigator />} 
         
     </NavigationContainer>
   )
 }
 const App = () => {
    
 
   return (
     <>
     <PaperProvider theme={theme}>
        <StatusBar barStyle="dark-content" backgroundColor="#CC5500"/> 
       <View style={styles.container}>
        <Navigation />
       </View>
       </PaperProvider>
     </>
   );
 };
 
 const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:"#fff"
    // backgroundColor:"#FFd580"
    }
 });
 
 export default App;