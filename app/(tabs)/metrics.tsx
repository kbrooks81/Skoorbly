import { METRICS } from "@/constants/metrics";
import React, { useMemo, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MetricRow = (typeof METRICS)[number] & {
  isArchived: boolean;
};

export default function Metrics() {
  const [rows, setRows] = useState<MetricRow[]>(
    METRICS.map((m) => ({ ...m, isArchived: false }))
  );

  const active = useMemo(() => rows.filter((r) => !r.isArchived), [rows]);
  const archived = useMemo(() => rows.filter((r) => r.isArchived), [rows]);

  const archiveMetric = (slug: string) => {
    if (active.length <= 1) {
      Alert.alert("At least one metric must be active.");
      return;
    }

    Alert.alert(
      "Archive metric?",
      "This hides the metric from Home (data is kept).",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Archive",
          style: "destructive",
          onPress: () => {
            setRows((prev) =>
              prev.map((r) =>
                r.slug === slug ? { ...r, isArchived: true } : r
              )
            );
          },
        },
      ]
    );
  };

  const restoreMetric = (slug: string) => {
    setRows((prev) =>
      prev.map((r) => (r.slug === slug ? { ...r, isArchived: false } : r))
    );
  };

  const MetricItem = ({ title, type, unit, isArchived, slug }: MetricRow) => {
    const meta =
      type === "number"
        ? `Number${unit ? ` • ${unit}` : ""}`
        : "Scale • Yes/No";

    return (
      <Pressable
        onPress={() => (isArchived ? restoreMetric(slug) : archiveMetric(slug))}
        className="rounded-2xl border border-neutral-200 bg-white p-4"
        style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-base font-semibold">{title}</Text>
            <Text className="text-xs text-neutral-600 mt-1">{meta}</Text>
          </View>

          <Text className="text-xs text-neutral-500">
            {isArchived ? "Restore" : "Archive"}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView className="flex-1 p-6 gap-4">
      <Text className="font-bold text-2xl">Metrics</Text>

      {/* Pro gating (UI-only) */}
      <View className="rounded-2xl border border-neutral-200 bg-white p-4 gap-2">
        <Text className="font-semibold">Free plan</Text>
        <Text className="text-sm text-neutral-600">
          You can track the default metrics. Unlock Pro to create custom
          metrics.
        </Text>

        <Pressable
          disabled
          className="mt-2 px-4 py-3 border rounded-lg opacity-40"
        >
          <Text className="font-bold text-base text-center">
            Add Metric (Pro)
          </Text>
        </Pressable>
      </View>

      {/* Active */}
      <View className="gap-3">
        <Text className="text-sm font-semibold text-neutral-700">Active</Text>
        {active.length === 0 ? (
          <Text className="text-sm text-neutral-600">No active metrics.</Text>
        ) : (
          active.map((m) => <MetricItem key={m.slug} {...m} />)
        )}
      </View>

      {/* Archived */}
      <View className="gap-3 pt-2">
        <Text className="text-sm font-semibold text-neutral-700">Archived</Text>
        {archived.length === 0 ? (
          <Text className="text-sm text-neutral-600">No archived metrics.</Text>
        ) : (
          archived.map((m) => <MetricItem key={m.slug} {...m} />)
        )}
      </View>
    </SafeAreaView>
  );
}
