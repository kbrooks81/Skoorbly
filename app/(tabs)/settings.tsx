import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Settings = () => {
  return (
    <SafeAreaView className="flex-1 p-6 gap-4">
      <Text className="font-bold text-2xl">Settings</Text>
    </SafeAreaView>
  )
}

export default Settings