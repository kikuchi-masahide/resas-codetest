<script setup lang="ts">
import { computed } from "vue";
import { sum } from "./sum";
import { useStore } from "./store/store";

const comp = computed(() => sum(1, 2));
const store = useStore();
</script>

<template>
    1+2={{ comp }}<br />
    store.count={{ store.count }}<br />
    <button @click="store.increment">increment</button>
</template>

<style scoped></style>
