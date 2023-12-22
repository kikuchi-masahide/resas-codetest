<template>
    <h1>都道府県一覧</h1>
    <div v-if="!checkboxProps">
        <p>都道府県コードを読み込み中です</p>
    </div>
    <div v-else class="table-container">
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
<style scoped>
@media screen and (max-width: 640px) {
    h1 {
        text-align: center;
    }
    table {
        border: 1px solid gray;
        border-radius: 5px;
        margin-bottom: 1em;
        padding: 0.5em;
        width: 100%;
    }
    table tr {
        width: 25%;
    }
}

@media screen and (min-width: 640px) {
    h1 {
        text-align: center;
    }
    table {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 1em;
        padding: 1em;
        width: 50%;
        border: 1px solid gray;
        border-radius: 5px;
    }
    table tr {
        width: 25%;
    }
}
</style>
