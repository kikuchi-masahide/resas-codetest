<template>
    <label :for="elementId">{{ label }}</label>
    <select :id="elementId" @change="onChange">
        <option v-for="item in items" :key="item.value" :value="item.value">
            {{ item.label }}
        </option>
    </select>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const { elementId, label, items } = defineProps<{
    elementId: string;
    label: string;
    items: Array<{
        label: string;
        value: number;
    }>;
}>();

const emits = defineEmits<{
    change: [value: number];
}>();

const onChange = (event: Event): void => {
    emits("change", Number((event.target as HTMLInputElement).value));
};
</script>
