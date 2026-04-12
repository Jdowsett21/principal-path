import { Pressable, StyleSheet, View } from "react-native";

import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";

import { Body, Label } from "./Type";

type ChoiceCardProps = {
  title: string;
  description?: string;
  selected?: boolean;
  onPress?: () => void;
};

export function ChoiceCard({ title, description, selected = false, onPress }: ChoiceCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, selected && styles.selected, pressed && styles.pressed]}
    >
      <View style={styles.dotOuter}>{selected ? <View style={styles.dotInner} /> : null}</View>
      <View style={styles.copy}>
        <Label>{title}</Label>
        {description ? <Body>{description}</Body> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 20,
    padding: spacing.md,
    backgroundColor: palette.surface
  },
  selected: {
    borderColor: palette.accent,
    backgroundColor: "#eef8f7"
  },
  pressed: {
    opacity: 0.9
  },
  dotOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: palette.accent,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1
  },
  dotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: palette.accent
  },
  copy: {
    flex: 1,
    gap: spacing.xs
  }
});
