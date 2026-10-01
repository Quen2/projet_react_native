import {Animated, Easing} from "react-native";
import {useCallback, useRef} from "react";
import {useFocusEffect} from "expo-router";
import {useReducedMotion} from "react-native-reanimated";

const STAGGER = 80;

export function useEntrance (order = 0, bouncy = false) {
    const progress = useRef(new Animated.Value(0)).current;
    const reducedMotion = useReducedMotion();

    useFocusEffect(useCallback(() => {
        if (reducedMotion) {
            progress.setValue(1);
            return;
        }

        const delay = order * STAGGER;
        const animation = bouncy
            ? Animated.spring(progress, {toValue: 1, friction: 6, tension: 80, delay, useNativeDriver: true})
            : Animated.timing(progress, {
                toValue: 1,
                duration: 400,
                delay,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
            });

        progress.setValue(0);
        animation.start();

        return () => animation.stop();
    }, [order, bouncy, reducedMotion]));

    return progress;
}
