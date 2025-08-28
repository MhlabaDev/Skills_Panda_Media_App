import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

type SkeletonProps = {
  style?: any;
};

export const Skeleton: React.FC<SkeletonProps> = ({ style }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      shimmerAnim.setValue(0);
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => animate());
    };
    animate();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],  /// </summary>
  /// width of shimmer sweep
  /// </summary>
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e1e9ee",
    overflow: "hidden",
    borderRadius: 12, 
  },
  /// </summary>
  /// shimmer block width
  /// </summary>
  shimmer: {
    flex: 1,
    width: 200, 
    backgroundColor: "#f6f7f8",
    opacity: 0.3,
  },
});
