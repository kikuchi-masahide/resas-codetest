import { ref } from "vue";

const checkedPrefCodes = ref(new Array<number>());

const onCheckedPrefCodesChanged = (prefCodes: number[]): void => {
    checkedPrefCodes.value = prefCodes;
};

export { checkedPrefCodes, onCheckedPrefCodesChanged };
