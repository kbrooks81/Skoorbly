import { getMetricBySlug } from "@/constants/metrics";
import { getEntry, upsertEntry } from "@/services/inMemoryEntries";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddEntry() {
  const params = useLocalSearchParams<{ slug?: string; date?: string }>();
  const slug = params.slug ?? "";
  const date = params.date ?? "";

  const metric = useMemo(() => getMetricBySlug(slug), [slug]);

  const existing = useMemo(() => {
    if (!metric || !date) return null;
    return getEntry(date, metric.slug);
  }, [date, metric]);

  const [numText, setNumText] = useState(() =>
    existing?.valueNum != null ? String(existing.valueNum) : ""
  );
  const [scaleValue, setScaleValue] = useState<number | null>(() =>
    existing?.valueInt != null ? existing.valueInt : null
  );

  if (!metric) {
    return (
      <SafeAreaView className="flex-1 p-6 gap-4">
        <Text className="font-bold text-2xl">Add Entry</Text>
        <Text>Missing or invalid metric.</Text>
        <Pressable
          onPress={() => router.back()}
          className="px-4 py-3 border rounded-lg"
        >
          <Text className="font-bold text-lg">Close</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const parsedNum =
    metric.type === "number" && numText.trim().length > 0
      ? Number(numText)
      : null;

  const isValid =
    metric.type === "number"
      ? parsedNum !== null && !Number.isNaN(parsedNum) && parsedNum > 0
      : scaleValue !== null;

  const isChanged =
    metric.type === "number"
      ? (existing?.valueNum ?? null) !== parsedNum
      : (existing?.valueInt ?? null) !== scaleValue;

  const canSave = isValid && isChanged;

  const onSave = () => {
    if (!metric || !date) return;

    if (metric.type === "number") {
      if (parsedNum === null || Number.isNaN(parsedNum) || parsedNum <= 0)
        return;
      upsertEntry(date, metric.slug, { valueNum: parsedNum });
    } else {
      if (scaleValue === null) return;
      upsertEntry(date, metric.slug, { valueInt: scaleValue });
    }

    router.back();
  };

  return (
    <SafeAreaView className="flex-1 p-6 gap-4">
      <Text className="font-bold text-2xl">{metric.title}</Text>
      <Text className="opacity-70">Logging for {date}</Text>

      {metric.type === "number" ? (
        <View className="gap-2">
          <Text className="font-bold">
            Value{metric.unit ? ` (${metric.unit})` : ""}
          </Text>
          <TextInput
            value={numText}
            onChangeText={setNumText}
            keyboardType="decimal-pad"
            placeholder="Enter a number"
            className="border rounded-lg px-4 py-3"
          />
          <Text className="text-xs opacity-60">
            Must be a number greater than 0.
          </Text>
        </View>
      ) : (
        <View className="gap-3">
          <Text className="font-bold">Completed?</Text>
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => setScaleValue(1)}
              className={`px-4 py-3 border rounded-lg ${
                scaleValue === 1 ? "opacity-100" : "opacity-60"
              }`}
            >
              <Text className="font-bold text-lg">Yes</Text>
            </Pressable>

            <Pressable
              onPress={() => setScaleValue(0)}
              className={`px-4 py-3 border rounded-lg ${
                scaleValue === 0 ? "opacity-100" : "opacity-60"
              }`}
            >
              <Text className="font-bold text-lg">No</Text>
            </Pressable>
          </View>
        </View>
      )}

      <View className="flex-row gap-3 pt-4">
        <Pressable
          onPress={() => router.back()}
          className="flex-1 px-4 py-3 border rounded-lg"
        >
          <Text className="font-bold text-lg text-center">Cancel</Text>
        </Pressable>

        <Pressable
          onPress={onSave}
          disabled={!canSave}
          className={`flex-1 px-4 py-3 border rounded-lg ${
            canSave ? "opacity-100" : "opacity-40"
          }`}
        >
          <Text className="font-bold text-lg text-center">Save</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
