import { Pressable, StyleSheet, Text } from "react-native";

import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";

type PillButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary";
};

export function PillButton({ title, onPress, variant = "primary" }: PillButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "secondary" && styles.secondary,
        pressed && styles.pressed
      ]}
    >
      <Text style={[styles.label, variant === "secondary" && styles.secondaryLabel]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    borderRadius: 999,
    backgroundColor: palette.accentDeep,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: palette.shadowStrong,
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
  },
  secondary: {
    backgroundColor: palette.surface,
    borderColor: palette.borderStrong
  },
  pressed: {
    opacity: 0.94,
    transform: [{ scale: 0.985 }, { translateY: 1 }]
  },
  label: {
    color: palette.surfaceRaised,
    fontSize: 15,
    fontWeight: "700"
  },
  secondaryLabel: {
    color: palette.accentDeep
  }
});
