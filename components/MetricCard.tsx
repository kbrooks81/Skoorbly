import React from "react";
import { Pressable, Text, View } from "react-native";

type MetricCardProps = {
  title: string;
  subtitle: string;
  valueText: string;
  statusText?: string;
  onPress?: () => void;
};

export default function MetricCard({
  title,
  subtitle,
  valueText,
  statusText,
  onPress,
}: MetricCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-2xl border border-neutral-200 bg-white p-4 gap-2"
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Open entry for ${title}`}
    >
      {/* Top row */}
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold">{title}</Text>
        <Text className="text-base font-medium">{valueText}</Text>
      </View>

      {/* Subtitle */}
      <Text className="text-sm text-neutral-600">{subtitle}</Text>

      {/* Status */}
      {statusText ? (
        <Text className="text-xs text-neutral-500">{statusText}</Text>
      ) : null}
    </Pressable>
  );
}
