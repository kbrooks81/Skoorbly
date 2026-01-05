import MetricCard from "@/components/MetricCard";
import { METRICS } from "@/constants/metrics";
import { getEntry, subscribe } from "@/services/inMemoryEntries";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function todayISODate(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function Index() {
  const today = useMemo(() => todayISODate(), []);
  const [, forceRender] = useState(0);

  useFocusEffect(
    useCallback(() => {
      forceRender((n) => n + 1);
      const unsubscribe = subscribe(() => {
        forceRender((n) => n + 1);
      });

      return unsubscribe;
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 p-6 gap-5">
      <Text className="font-bold text-2xl">Today</Text>
      {METRICS.map((m) => {
        const entry = getEntry(today, m.slug);

        const statusText = entry ? "Logged" : "Not logged";

        let valueText = "";
        if (m.type === "number" && entry?.valueNum != null) {
          valueText = `${entry.valueNum} ${m.unit ?? ""}`.trim();
        }
        if (m.type === "scale" && entry?.valueInt != null) {
          valueText = m.scaleLabels?.[entry.valueInt] ?? String(entry.valueInt);
        }

        return (
          <MetricCard
            key={m.slug}
            title={m.title}
            subtitle={m.helperText}
            valueText={valueText}
            statusText={statusText}
            onPress={() =>
              router.push({
                pathname: "/(modals)/add-entry",
                params: { slug: m.slug, date: today },
              })
            }
          />
        );
      })}
    </SafeAreaView>
  );
}
