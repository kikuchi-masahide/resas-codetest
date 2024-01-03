<template>
    <dropDown
        element-id="value-type"
        label="値の種類"
        :items="valueTypeDropboxItems"
        @change="onValueTypeChange"
    />
    <lineGraph
        title="人口構成推移図"
        x-axis-title="年度"
        :x-axis-categories="xAxisCategories"
        y-axis-title="人口数"
        :y-axis-series="yAxisSeries"
    />
</template>
<script setup lang="ts">
import { onMounted, watch } from "vue";
import dropDown from "../atoms/drop-down.vue";
import lineGraph from "../atoms/line-graph.vue";
import {
    onMountedFunctor,
    type DefinePropsType,
    valueTypeDropboxItems,
    xAxisCategories,
    yAxisSeries,
    onValueTypeChange,
    watchCheckedPrefCodes,
} from "./graph-area-view-model";

const props = defineProps<DefinePropsType>();

watch(() => props.checkedPrefCodes, watchCheckedPrefCodes);

onMounted(onMountedFunctor);
</script>
