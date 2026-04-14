import { ReactNode } from "react";
import { StyleSheet, Text, TextProps } from "react-native";

import { palette } from "@/theme/palette";

export function Eyebrow({ children, style, ...props }: TextProps & { children: ReactNode }) {
  return (
    <Text {...props} style={[styles.eyebrow, style]}>
      {children}
    </Text>
  );
}

export function Heading({ children, style, ...props }: TextProps & { children: ReactNode }) {
  return (
    <Text {...props} style={[styles.heading, style]}>
      {children}
    </Text>
  );
}

export function Body({ children, style, ...props }: TextProps & { children: ReactNode }) {
  return (
    <Text {...props} style={[styles.body, style]}>
      {children}
    </Text>
  );
}

export function Label({ children, style, ...props }: TextProps & { children: ReactNode }) {
  return (
    <Text {...props} style={[styles.label, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.6,
    textTransform: "uppercase",
    color: palette.accent
  },
  heading: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    color: palette.ink
  },
  body: {
    fontSize: 15,
    lineHeight: 24,
    color: palette.muted
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    color: palette.ink,
    fontWeight: "700"
  }
});
