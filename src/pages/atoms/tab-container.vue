<template>
    <!-- slotのうち、現在選択中であるidをnameとして持つもののみを表示する
        例 id"1"を選択中の場合v-slot:1が、id"2"を選択中の場合v-slot:2が表示される 
        <tabContainer :tab-props="[{id: '1',label:'tab1'},{id: '2',label: 'tab2'}]">
            <template v-slot:1>
                タブ1
            </template>
            <template v-slot:2>
                タブ2
            </template>
        </tabContainer>
    -->
    <div class="selectors">
        <template v-for="prop in props.tabProps" :key="prop.id">
            <div
                :id="prop.id"
                :class="prop.id === currentTabId ? 'selected' : 'unselected'"
                @click="tabSelectorOnClick(prop.id)"
            >
                {{ prop.label }}
            </div>
        </template>
    </div>
    <div :id="currentTabId" class="body">
        <slot :name="currentTabId" />
    </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import {
    type DefinePropsType,
    currentTabId,
    onMountedFunctor,
    tabSelectorOnClick,
} from "./tab-container-view-model";

const props = defineProps<DefinePropsType>();

onMounted(() => {
    onMountedFunctor(props);
});
</script>
<style scoped>
.selected {
    display: inline-block;
    padding: 0.5rem 1.5rem 0.5rem 1.5rem;
    border: 1px solid black;
    border-bottom: 1px solid white;
    border-radius: 0.5rem 0.5rem 0 0;
    flex: auto;
}

.unselected {
    display: inline-block;
    padding: 0.5rem 1.5rem 0.5rem 1.5rem;
    border: 1px solid black;
    border-radius: 0.5rem 0.5rem 0 0;
    flex: auto;
}

.selectors {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.body {
    border: 1px solid black;
    padding: 1rem;
    border-top: none;
    border-radius: 0 0 0.5rem 0.5rem;
}
</style>
