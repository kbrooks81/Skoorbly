import MetricCard from "@/components/MetricCard";
import { router } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 p-6 gap-4">
      <Text className="font-bold text-2xl">Today</Text>

      <MetricCard 
        title="Weight"
        subtitle="Tap to log today's weight"
        valueText="Not logged"
        onPress={() => router.push("/(modals)/add-entry")}
      />
      <MetricCard 
        title="Sleep Duration"
        subtitle="Tap to log last night's sleep"
        valueText="Not logged"
        onPress={() => router.push("/(modals)/add-entry")}

      />
      <MetricCard
        title="Workout Completed"
        subtitle="Tap to log today's workout"
        valueText="Not logged"
        onPress={() => router.push("/(modals)/add-entry")}
      />
    </SafeAreaView>
  );
}
