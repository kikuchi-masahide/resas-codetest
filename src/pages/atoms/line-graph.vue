<template>
    <Chart :options="options" />
</template>
<script setup lang="ts">
import { Chart } from "highcharts-vue";
import { defineProps } from "vue";
import { getGraphOptions } from "./line-graph-view-model";

const { title, xAxisTitle, xAxisCategories, yAxisTitle, yAxisSeries } =
    defineProps<{
        title: string;
        xAxisTitle: string;
        xAxisCategories: string[];
        yAxisTitle: string;
        yAxisSeries: Array<{
            name: string;
            data: Array<{
                x: string;
                y: number;
                // 直前の点との結び方
                dashStyle?: "Solid" | "Dash";
            }>;
        }>;
    }>();

const options = getGraphOptions(
    title,
    xAxisTitle,
    xAxisCategories,
    yAxisTitle,
    yAxisSeries,
);
</script>
