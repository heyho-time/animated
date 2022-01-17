import React, { useEffect, useState, useRef } from "react";
import {
  Animated,
  Easing,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";

const AnimatedBox = Animated.createAnimatedComponent(Box);

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function App() {
  const POSITION = useRef(
    new Animated.ValueXY({
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    })
  ).current;

  const moveUp = () => {
    Animated.timing(POSITION, {
      toValue: {
        x: -SCREEN_WIDTH / 2,
        y: -SCREEN_HEIGHT / 2,
      },
      useNativeDriver: false,
    });
  };

  const rotation = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });

  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });

  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255, 99, 71)", "rgb(71, 166, 255)"],
  });
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            backgroundColor: bgColor,
            borderRadius,
            transform: [
              { rotateY: rotation },
              ...POSITION.getTranslateTransform(),
            ],
          }}
        />
      </Pressable>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  background-color: red;
  width: 200px;
  height: 200px;
`;
