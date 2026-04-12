import { StyleSheet, View } from "react-native";

import { palette } from "@/theme/palette";

type ProgressBarProps = {
  value: number;
  color?: string;
};

export function ProgressBar({ value, color = palette.accent }: ProgressBarProps) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.max(0, Math.min(100, value))}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: "100%",
    height: 8,
    borderRadius: 999,
    backgroundColor: palette.border,
    overflow: "hidden"
  },
  fill: {
    height: "100%",
    borderRadius: 999
  }
});
