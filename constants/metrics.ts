export type MetricType = "number" | "scale";

export type MetricDef = {
    slug: "weight" | "sleep_duration" | "workout_completed";
    title: string;
    type: MetricType;
    unit?: string;
    scaleLabels?: Record<number, string>;
    helperText: string;
};

export const METRICS: MetricDef[] = [
    {
        slug: "weight",
        title: "Weight",
        type: "number",
        unit: "lb",
        helperText: "Tap to log today's weight"
    },
    {
        slug: "sleep_duration",
        title: "Sleep Duration",
        type: "number",
        unit: "hours",
        helperText: "Tap to log last night's sleep"
    },
    {
        slug: "workout_completed",
        title: "Workout Completed",
        type: "scale",
        scaleLabels: { 0: "No", 1: "Yes"},
        helperText: "Tap to log today's workout"
    },
];

export function getMetricBySlug(slug: string) {
    return METRICS.find((m) => m.slug === slug) ?? null;
}