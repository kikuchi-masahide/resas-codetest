<template>
    <graphPage />
</template>

<script setup lang="ts">
import graphPage from "./pages/graph-page.vue";
import useEntityDataStore from "./usecases/entitiy-data-store";
import instantiateInputAdapter from "./interface-adapters/instantiate-input-adapter";

const store = useEntityDataStore();
store.setupInputAdapter(instantiateInputAdapter());
</script>

<style scoped></style>
