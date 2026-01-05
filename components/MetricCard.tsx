import React from "react";
import { Pressable, Text, View } from "react-native";

type MetricCardProps = {
  title: string;
  subtitle: string;
  valueText: string;
  onPress?: () => void;
};

export default function MetricCard({
  title,
  subtitle,
  valueText,
  onPress,
}: MetricCardProps) {
  return (
    <Pressable
        onPress={onPress}
        className="borde rounded-xl p-4 gap-2"
        accessibilityRole="button"
        accessibilityLabel={`Open entry for #{title}`}
    >
        <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold">{title}</Text>
            <Text className="text-base">{valueText}</Text>
        </View>

        <Text className="text-sm opacity-70">{subtitle}</Text>
    </Pressable>
  );
}
