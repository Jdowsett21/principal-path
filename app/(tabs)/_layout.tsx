import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { palette } from "@/theme/palette";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: palette.ink,
        tabBarInactiveTintColor: palette.muted,
        tabBarStyle: {
          backgroundColor: palette.surface,
          borderTopColor: palette.border,
          height: 88,
          paddingTop: 10,
          paddingBottom: 24
        },
        tabBarIcon: ({ color, size }) => {
          const iconByRoute: Record<string, keyof typeof Ionicons.glyphMap> = {
            index: "home-outline",
            "skill-map": "git-network-outline",
            frontier: "sparkles-outline",
            "build-lab": "hammer-outline",
            simulations: "flask-outline",
            progress: "bar-chart-outline"
          };

          return <Ionicons color={color} name={iconByRoute[route.name]} size={size} />;
        }
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Today" }} />
      <Tabs.Screen name="skill-map" options={{ title: "Map" }} />
      <Tabs.Screen name="frontier" options={{ title: "Frontier" }} />
      <Tabs.Screen name="build-lab" options={{ title: "Build Lab" }} />
      <Tabs.Screen name="simulations" options={{ title: "Labs" }} />
      <Tabs.Screen name="progress" options={{ title: "Progress" }} />
    </Tabs>
  );
}
