<template>
    <div v-if="!checkboxProps">
        <p>都道府県コードを読み込み中です</p>
    </div>
    <div v-else>
        <table>
            <tbody>
                <tr v-for="row in checkboxProps" :key="row.rowIndex">
                    <td v-for="col in row.cols" :key="col.colIndex">
                        <check-box
                            :id="col.data.id"
                            :group-id="col.data.groupId"
                            :label="col.data.label"
                            @change="
                                emits(
                                    'change',
                                    emitOnChangeFuncParameter(col.data.id),
                                )
                            "
                        />
                    </td>
                </tr>
            </tbody>
        </table>
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
