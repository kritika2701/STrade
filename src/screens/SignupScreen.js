import React,{useState} from 'react'
import { View, Text ,Image,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Alert} from 'react-native'
import { TextInput,Button} from 'react-native-paper'
import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging';


const LoginScreen = ({navigation}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    const userSignup = async ()=>{
        if(!email||!password){
          Alert.alert("Please fill out all the fields.")  
          return
        }
        try{
            //create new user, add the user token to a separate database
            await auth().createUserWithEmailAndPassword(email,password)
            messaging().getToken().then(token=>{
                firestore().collection('usertoken').add({
                    token:token
                })
              })
           
        }catch(err){
            console.log(err)
            Alert.alert("Something went wrong. Please try again.")
        }
     
    }
    return (
        <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
               <Image style={{width:300,height:300}} source={require('../assets/logo.png')}/>
               <Text style={styles.text}>Sign Up Here!</Text>
            </View>
            <View style={styles.box2}>
            <TextInput
                label="Email"
                value={email}
                mode="outlined"
                onChangeText={text => setEmail(text)}
                />
            <TextInput
                label="password"
                value={password}
                mode="outlined"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                />
                 <Button style={{backgroundColor:"#cc5500"}} mode="contained" onPress={() => userSignup()}>
                     Sign Up
                 </Button>
                 <TouchableOpacity onPress={()=>navigation.goBack()}><Text style={{textAlign:"center"}}>Already have an account? Login.</Text></TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    box1:{
        alignItems:"center"
    },
    box2:{
        paddingHorizontal:40,
        height:"50%",
        justifyContent:"space-evenly"
    },
    text:{
        fontSize:22
    }
 });

export default LoginScreen