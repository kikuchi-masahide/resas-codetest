<script setup lang="ts">
import { computed } from "vue";
import { sum } from "./sum";

const comp = computed(() => sum(1, 2));
</script>

<template>1+2={{ comp }}</template>

<style scoped></style>
