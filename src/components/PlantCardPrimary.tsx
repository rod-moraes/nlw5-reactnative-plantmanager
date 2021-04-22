import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import { Button } from "../components/Button";
import {SvgFromUri} from 'react-native-svg'

import colors from "../styles/colors";
import { Header } from "../components/Header";
import fonts from "../styles/fonts";
import { EnvironmentButton } from "../components/EnvironmentButton";
import api from "../services/api";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

interface PlantProps extends RectButtonProps{
  data:{
    name:string;
    photo:string;
  }
}

export const PlantCardPrimary = ({data,...rest}:PlantProps)=>{
  return (
    <RectButton style={styles.container}{...rest}>
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Text style={styles.text}>
        {data.name}
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    maxWidth: '45%',
    backgroundColor: colors.shape,
    borderRadius:20,
    paddingVertical: 10,
    alignItems:"center",
    margin: 10
  },
  text:{
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16
  }
})