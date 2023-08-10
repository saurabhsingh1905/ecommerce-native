import {
    
    View,
    
    TextInput,
    Pressable,
    
  } from "react-native";
  import React, { useCallback, useContext, useEffect, useState } from "react";
  // import { SafeAreaView } from "react-native-safe-area-context";
  import { AntDesign } from "@expo/vector-icons";
  import { Feather } from "@expo/vector-icons";
  
  const SearchBar = () => {
    return (
<View
style={{
  backgroundColor: "#00CED1",
  padding: 10,
  flexDirection: "row",
  alignItems: "center",
}}
>
<Pressable
  style={{
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 7,
    gap: 10,
    backgroundColor: "white",
    borderRadius: 3,
    height: 38,
    flex: 1,
  }}
>
  <AntDesign
    name="search1"
    size={22}
    color="black"
    style={{ paddingLeft: 10 }}
  />
  <TextInput placeholder="Search Amazon.in" />
</Pressable>
<Feather name="mic" size={24} color="black" />
</View>
 )
}


 export default SearchBar
