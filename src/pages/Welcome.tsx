import React, {useState} from "react";
import { SafeAreaView, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import colors from "../../styles/colors";
import wateringImg from "../assets/watering.png";
import { Button } from "../components/Buttom";

export function Welcome() {
  const [visible, setVisible] = useState(false);
  function handleVisibility(){
    setVisible(!visible)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Gerencie{'\n'} suas plantas{'\n'} de forma fácil</Text>
      {
        visible&&
        <Image source={wateringImg} style={styles.image}></Image>
      }
      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>
      <Button title=">" onPress={handleVisibility}/>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title:{
    fontSize:32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop:38
  },
  subtitle: {
    fontSize:18,
    textAlign: 'center',
    color: colors.heading,
    paddingHorizontal: 20
  },
  image: {
    width: 292,
    height: 284
  },
});
