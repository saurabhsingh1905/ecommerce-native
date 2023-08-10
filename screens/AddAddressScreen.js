import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserType } from "../UserContext";

const AddAddressScreen = () => {

const navigation = useNavigation()
const [addresses,setAddresses] = useState([])
const {userId,setUserId} = useContext(UserType)

console.log("shivi userId",userId)

useEffect(()=>{
  fetchAddresses()
},[])

const fetchAddresses = async ()=> {
try {
  const response = await axios.get(`http://192.168.130.136:8000/addresses/${userId}`)
  const {addresses} = response.data;

  setAddresses(addresses)
} catch (error) {
  console.log("error in addaddresssscreen",error)
}
}
// console.log(addresses)
  return (
    <ScrollView
      style={{
        paddingTop: Platform.OS === "android" ? 40 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
      showsVerticalScrollIndicator={false}
    >
      <SearchBar />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Your Address</Text>
        <Pressable
        onPress={()=>navigation.navigate("Add")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderWidth:1,
            borderLeftWidth:0,
            borderRightWidth:0,
            paddingVertical:5,
            paddingHorizontal:5
          }}
        >
          <Text>Add a new address</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>
          {/* ALL added addresses comes here  */}

          
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
