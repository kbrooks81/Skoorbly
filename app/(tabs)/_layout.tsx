import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: 'Home' }} />
            <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
            <Tabs.Screen name="charts" options={{ title: 'Charts' }} />
            <Tabs.Screen name="metrics" options={{ title: 'Metrics' }} />
        </Tabs>
    );
}