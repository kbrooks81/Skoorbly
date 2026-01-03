import { router } from "expo-router";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 p-6 gap-4">
      <Text className="font-bold text-2xl">Home</Text>

      <Pressable
        onPress={() => router.push("/(modals)/add-entry")}
        className="px-4 py-3 border rounded-lg"
      >
        <Text className="font-bold text-lg">Add Entry</Text>
      </Pressable>
    </SafeAreaView>
  );
}
