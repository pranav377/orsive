import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withSpring,
} from "react-native-reanimated";

export default function AnimatedButton(props: {
  beforeButton: React.ReactNode;
  afterButton: React.ReactNode;
  onPress?: () => void;
}) {
  const pressed = useSharedValue(0);

  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(pressed.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: pressed.value,
        },
      ],
      opacity: pressed.value,
    };
  });

  return (
    <Pressable
      onPress={() => {
        pressed.value = withSpring(pressed.value ? 0 : 1);
        if (props.onPress) {
          props.onPress();
        }
      }}
    >
      <Animated.View style={[StyleSheet.absoluteFillObject, outlineStyle]}>
        {props.beforeButton}
      </Animated.View>

      <Animated.View style={fillStyle}>{props.afterButton}</Animated.View>
    </Pressable>
  );
}
