import React,{useState} from 'react'
import { View, Text ,Image,StyleSheet,KeyboardAvoidingView,TouchableOpacity,Alert} from 'react-native'
import { TextInput,Button} from 'react-native-paper'
import auth from '@react-native-firebase/auth';


const LoginScreen = ({navigation}) => {

    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const userLogin = async ()=>{
        if(!email||!password){
          Alert.alert("Please fill out all the fields.")  
          return
        }
        try{
            //sign in using firebase authentication
         const result =   await auth().signInWithEmailAndPassword(email,password)
         console.log(result.user)
        }catch(err){
            //not able to login. incorrect details
            Alert.alert("Something went wrong. Please try again.")
        }
     
    }
    return (
        <KeyboardAvoidingView behavior="position">
            <View style={styles.box1}>
               <Image style={{width:300,height:300}} source={require('../assets/logo.png')}/>  
               <Text style={styles.text}>Login Here!</Text>
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
                 <Button style={{backgroundColor:"#cc5500"}}  mode="contained" onPress={() => userLogin()}>
                     Login
                 </Button>
                 <TouchableOpacity onPress={()=>navigation.navigate("signup")}><Text style={{textAlign:"center"}}>Don't have a account? Sign Up.</Text></TouchableOpacity>

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