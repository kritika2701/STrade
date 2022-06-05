import React,{useEffect,useState} from 'react'
import { View, Text ,FlatList,StyleSheet,Linking,Platform} from 'react-native'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
//home screen to display all items
const ListItemScreen = () => {
    const [items,setItems] = useState([])
    //get all items stored in the database
    const getDetails = async ()=>{
      //get data from firestore
      const querySnap = await firestore().collection('ads').get()
      const result =  querySnap.docs.map(docSnap=>docSnap.data())
      // console.log(result)
      setItems(result)
    }
    //function which is executed when call seller button is pressed, opens the phone app 
    const openDial = (phone)=>{
        if(Platform.OS ==='android'){
          Linking.openURL(`tel:${phone}`)
        }else{
          Linking.openURL(`telprompt:${phone}`)
        }
    }
    //used to load items every time page is loaded
    useEffect(()=>{
      getDetails()
      return ()=>{
        console.log("cleanup")
      }
    },[])

    //render each item as a card
    const renderItem = (item)=>{
      return(
          <Card style={styles.card}>
        <Card.Title title={item.name}  />
        <Card.Content>
          <Paragraph>{item.desc}</Paragraph>
          <Paragraph>{item.year}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: item.image }} />
        <Card.Actions>
          <Button style={{color:"#FF9D57"}}>Rs: {item.price}</Button>
          <Button style={{color:"#FF9D57"}} onPress={()=>openDial()}>CALL OWNER</Button>
        </Card.Actions>
      </Card>  
      )
    }
    return (
      //flatlist is used to iterate over all items in a list
      //call renderItem method on all items
        <View>
            <FlatList 
            data={items.reverse()}
            keyExtractor={(item)=>item.phone}
            renderItem={({item})=>renderItem(item)}
           
            />
        </View>
    )
}


const styles = StyleSheet.create({
    card:{
        margin:10,
        elevation:2
    }
     });
    
    

export default ListItemScreen