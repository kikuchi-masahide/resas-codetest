<template>
    <h1>都道府県一覧</h1>
    <div v-if="!viewModel.isPrefIndexDatasLoaded">
        <p>都道府県コードを読み込み中です</p>
    </div>
    <tabContainer v-else :tabProps="viewModel.tabContainerTabProps">
        <template v-slot:code-order>
            <template
                v-for="{ areaName, table } in viewModel.checkboxPropsCodeOrder
                    .value"
            >
                <h2>{{ areaName }}</h2>
                <hr />
                <table>
                    <tbody>
                        <tr
                            v-for="[rowIndex, row] in table.entries()"
                            :key="rowIndex"
                        >
                            <td
                                v-for="[colIndex, col] in row.entries()"
                                :key="colIndex"
                            >
                                <check-box
                                    :id="col.id"
                                    :group-id="col.groupId"
                                    :label="col.label"
                                    :checked="
                                        viewModel.isPrefIdCheckedComputed(
                                            col.id,
                                        )
                                    "
                                    @change="
                                        emits(
                                            'change',
                                            viewModel.emitOnChangeFuncParameter(
                                                col.id,
                                            ),
                                        )
                                    "
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </template>
        </template>
        <template v-slot:name-order>
            <dropDown
                v-bind="viewModel.nameSortOrderDropDownProps"
                @change="viewModel.nameSortOrderDropDownOnChanged"
            />
            <table>
                <tbody>
                    <tr
                        v-for="[
                            rowIndex,
                            row,
                        ] in viewModel.checkboxPropsNameOrder.value.entries()"
                        :key="rowIndex"
                    >
                        <td
                            v-for="[colIndex, col] in row.entries()"
                            :key="colIndex"
                        >
                            <check-box
                                :id="col.id"
                                :group-id="col.groupId"
                                :label="col.label"
                                :checked="
                                    viewModel.isPrefIdCheckedComputed(col.id)
                                "
                                @change="
                                    emits(
                                        'change',
                                        viewModel.emitOnChangeFuncParameter(
                                            col.id,
                                        ),
                                    )
                                "
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
    </tabContainer>
</template>
<script setup lang="ts">
import * as viewModel from "./prefs-select-area-view-model";
import tabContainer from "../atoms/tab-container.vue";
import checkBox from "../atoms/check-box.vue";
import dropDown from "../atoms/drop-down.vue";
import { onMounted } from "vue";

const emits = defineEmits<{
    change: viewModel.EmitChangeParameterType;
}>();

onMounted(viewModel.onMountedFunctor);
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
