import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  View,
} from "react-native";
import colors from "../styles/colors";
import {useNavigation} from '@react-navigation/native'
import wateringImg from "../assets/watering.png";
import { Entypo, Feather } from "@expo/vector-icons";
import fonts from "../styles/fonts";

export function Welcome() {
  const navigation = useNavigation();
  function handleStart(){
    navigation.navigate('UserIdentification')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie{"\n"}suas plantas de{"\n"}forma fácil
        </Text>

        <Image source={wateringImg} style={styles.image} resizeMode="contain" />
        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar. 
        </Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={handleStart}>
          <Feather name="chevron-right" style={styles.buttonIcon}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex:1,    
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: colors.heading,
    paddingHorizontal: 20,
    fontFamily: fonts.text,
  },
  image: {
    height: Dimensions.get("window").width * 0.7,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green,
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 32,
  },
});
