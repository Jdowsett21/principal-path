import { StyleSheet, View } from "react-native";

import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";

import { Body, Heading, Label } from "./Type";

type MetricTileProps = {
  label: string;
  value: string;
  helper?: string;
};

export function MetricTile({ label, value, helper }: MetricTileProps) {
  return (
    <View style={styles.tile}>
      <Body>{label}</Body>
      <Heading style={styles.value}>{value}</Heading>
      {helper ? <Label style={styles.helper}>{helper}</Label> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minWidth: 140,
    backgroundColor: palette.surface,
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: palette.border,
    gap: spacing.xs
  },
  value: {
    fontSize: 24,
    lineHeight: 28
  },
  helper: {
    color: palette.muted
  }
});
