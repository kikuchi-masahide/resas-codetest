<template>
    <div>
        <prefsSelectArea @change="onCheckedPrefCodesChanged" />
        <graphArea :checked-pref-codes="checkedPrefCodes" />
    </div>
</template>
<script setup lang="ts">
import prefsSelectArea from "./organisms/prefs-select-area.vue";
import graphArea from "./organisms/graph-area.vue";
import {
    checkedPrefCodes,
    onCheckedPrefCodesChanged,
} from "./graph-page-view-model";
</script>
