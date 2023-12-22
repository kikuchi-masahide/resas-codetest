<template>
    <input :id="elementId" type="checkbox" @change="emits('change', id)" />
    <label :for="elementId">{{ label }}</label>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const { groupId, id } = defineProps<{
    groupId: string;
    id: number;
    label: string;
}>();

const emits = defineEmits<{
    change: [id: number];
}>();

const elementId = `${groupId}#${id}`;
</script>
