import { router } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddEntry = () => {
  return (
    <SafeAreaView className="flex-1 p-6 gap-4">
      <Text className="font-bold text-2xl">Add Entry</Text>

      <Pressable
        onPress={() => router.back()}
        className="px-4 py-3 border rounded-lg"
      >
        <Text className="font-bold text-lg">Close</Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default AddEntry