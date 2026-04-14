import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { palette } from "@/theme/palette";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        sceneStyle: {
          backgroundColor: palette.canvas
        },
        tabBarActiveTintColor: palette.accentDeep,
        tabBarInactiveTintColor: palette.muted,
        tabBarStyle: {
          backgroundColor: "rgba(251, 247, 240, 0.96)",
          borderTopColor: palette.border,
          height: 96,
          paddingTop: 12,
          paddingBottom: 26,
          paddingHorizontal: 14
        },
        tabBarItemStyle: {
          borderRadius: 18,
          marginHorizontal: 4
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginTop: 2
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

          return <Ionicons color={color} name={iconByRoute[route.name]} size={size + 1} />;
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
