import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const ProductItem = ({ item, key }) => {
  return (
    <Pressable style={{ marginHorizontal: 15, marginVertical: 25 }}>
      <Image
        style={{ height: 150, width: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />
      <Text
      numberOfLines={1}
        style={{
          width:150,
          marginTop:10,
        }}
      >
        {item?.title}
      </Text>

      <View style={{marginTop:5,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
        <Text style={{fontSize:15,fontWeight:"bold"}}>$ {item?.price}</Text>
        <Text style={{color:"#FFC72C",fontWeight:"bold"}}>{item?.rating.rate} ratings</Text>
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
