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
    <Pressable onPress={onPress} style={[styles.button, variant === "secondary" && styles.secondary]}>
      <Text style={[styles.label, variant === "secondary" && styles.secondaryLabel]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 999,
    backgroundColor: palette.ink,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg
  },
  secondary: {
    backgroundColor: palette.accentSoft
  },
  label: {
    color: palette.surfaceRaised,
    fontSize: 15,
    fontWeight: "700"
  },
  secondaryLabel: {
    color: palette.accent
  }
});
