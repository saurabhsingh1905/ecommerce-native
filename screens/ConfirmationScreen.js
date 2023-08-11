import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const ConfirmationScreen = () => {
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <ScrollView style={{ marginTop: 48 }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}

              <View style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}>
                {index < currentStep ?
                 (<Text   style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>&#10003;</Text>) :
                  (<Text   style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>{index+1}</Text>)}
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});
