import {Animated} from "react-native";
import {useRef} from "react";

export function usePressScale () {
    const scale = useRef(new Animated.Value(1)).current;

    const animateTo = (value: number) => {
        Animated.spring(scale, {toValue: value, friction: 5, useNativeDriver: true}).start();
    }

    return {
        scale,
        pressIn: () => animateTo(0.94),
        pressOut: () => animateTo(1),
    };
}
