<template>
    <Chart :options="options" />
</template>
<script setup lang="ts">
import { Chart } from "highcharts-vue";
import { computed } from "vue";
import {
    type PropsType,
    type GraphOptionsType,
    getGraphOptions,
} from "./line-graph-view-model";

const props = defineProps<PropsType>();

const options = computed<GraphOptionsType>(() =>
    getGraphOptions(
        props.title,
        props.xAxisTitle,
        props.xAxisCategories,
        props.yAxisTitle,
        props.yAxisSeries,
    ),
);
</script>
