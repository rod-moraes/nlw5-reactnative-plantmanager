import React from "react";

import {
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableOpacityProps,
  Image,
  View,
} from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import userImg from "../assets/photo.png";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnvironmentButton({
  title,
  active = false,
  ...rest
}: EnvironmentButtonProps) {
  return (
    <RectButton
      style={[styles.container, active && styles.containerActive]}
      {...rest}
    >
      <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginRight: 5
  },
  containerActive: {
    backgroundColor: colors.green_light,
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text,
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },
});
