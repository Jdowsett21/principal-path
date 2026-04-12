import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";

type SectionCardProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function SectionCard({ children, style }: SectionCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surfaceRaised,
    borderRadius: 24,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: palette.shadow,
    shadowOpacity: 1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4
  }
});
