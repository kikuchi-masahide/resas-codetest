<template>
    <div v-if="!checkboxProps">
        <p>都道府県コードを読み込み中です</p>
    </div>
    <div v-else>
        <ul>
            <li v-for="prop in checkboxProps" :key="prop.id">
                <check-box
                    :id="prop.id"
                    :group-id="prop.groupId"
                    :label="prop.label"
                    @change="
                        emits('change', emitOnChangeFuncParameter(prop.id))
                    "
                />
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import {
    checkboxProps,
    onMountedFunctor,
    emitOnChangeFuncParameter,
    type EmitChangeParameterType,
} from "./prefs-select-area-view-model";
import checkBox from "../atoms/check-box.vue";
import { onMounted } from "vue";

const emits = defineEmits<{
    change: EmitChangeParameterType;
}>();

onMounted(onMountedFunctor);
</script>
