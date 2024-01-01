<template>
    <input
        :id="elementId"
        :checked="props.checked ?? false"
        type="checkbox"
        @change="emits('change', props.id)"
    />
    <label :for="elementId">{{ props.label }}</label>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
    groupId: string;
    id: number;
    label: string;
    checked?: boolean;
}>();

const emits = defineEmits<{
    change: [id: number];
}>();

const elementId = `${props.groupId}#${props.id}`;
</script>
