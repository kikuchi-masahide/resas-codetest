import { computed, ref } from "vue";
import useEntityDataStore from "../../usecases/entitiy-data-store";
import { PrefectureIndexData } from "@/entities/prefecture-data";

const isPrefIndexDatasLoadedRef = ref(false);
const isPrefIndexDatasLoaded = computed(() => isPrefIndexDatasLoadedRef.value);

const checkboxPropsCodeOrder = ref<
    Array<{
        // 地方ごとのデータ
        areaName: string;
        table: Array<
            // 1行分のデータ
            Array<{
                // 1マス分のデータ
                groupId: string;
                id: number;
                label: string;
            }>
        >;
    }>
>([]);
const checkboxPropsNameOrderAsc1d = ref<
    Array<{
        groupId: string;
        id: number;
        label: string;
    }>
>([]);

const checkedPrefIdsSet = ref(new Set<number>());
// checkboxPropsCodeOrderの更新はタブ切り替え時行われないがcheckBoxVueは更新されるため、
// checkboxの入力値参照はこちらを用いる
const isPrefIdCheckedComputed = (id: number): boolean => {
    return computed(() => checkedPrefIdsSet.value.has(id)).value;
};

const nameSortOrderDropDownProps = {
    elementId: "name-sort-order",
    label: "ソート順",
    items: [
        {
            label: "昇順(あ→ん)",
            value: 0,
        },
        {
            label: "降順(ん→あ)",
            value: 1,
        },
    ],
};

const nameSortOrderDropDownValueRef = ref(0);
const nameSortOrderDropDownValue = computed(
    () => nameSortOrderDropDownValueRef.value,
);

// ４行の表としてcheck-boxを配置するため、
// checkboxPropsNameOrder1dを4つずつに分割する
const checkboxPropsNameOrder = computed(() => {
    const res = new Array<
        Array<{
            groupId: string;
            id: number;
            label: string;
        }>
    >();
    const chunkSize = 4;
    const wholeLen = checkboxPropsNameOrderAsc1d.value.length;
    for (let rowIndex = 0; rowIndex < wholeLen / chunkSize; rowIndex += 1) {
        res.push([]);
        const back = res[rowIndex];
        for (
            let index = chunkSize * rowIndex;
            index < chunkSize * (rowIndex + 1) && index < wholeLen;
            index++
        ) {
            back.push(
                checkboxPropsNameOrderAsc1d.value[
                    nameSortOrderDropDownValueRef.value == 0
                        ? index
                        : wholeLen - index - 1
                ],
            );
        }
    }
    console.log(checkboxPropsNameOrderAsc1d.value);
    return res;
});

const nameSortOrderDropDownOnChanged = (value: number): void => {
    nameSortOrderDropDownValueRef.value = value;
};

const onMountedFunctor = async (): Promise<void> => {
    const store = useEntityDataStore();
    const prefIdIndexDatas = Array.from(await store.getPrefectureIndexDatas());
    // areaCodeごとに分割する
    const prefIdIndexDatasByAreaMap = new Map<
        number,
        [number, PrefectureIndexData][]
    >();
    for (const indexData of prefIdIndexDatas) {
        if (!prefIdIndexDatasByAreaMap.has(indexData[1].areaCode)) {
            prefIdIndexDatasByAreaMap.set(indexData[1].areaCode, []);
        }
        prefIdIndexDatasByAreaMap.get(indexData[1].areaCode)?.push(indexData);
    }
    const prefIdIndexDatasByArea = prefIdIndexDatasByAreaMap.values();
    // codesを4つずつに分割する
    const chunkSize = 4;
    checkboxPropsCodeOrder.value = [];
    for (const datas of prefIdIndexDatasByArea) {
        const areaName = datas[0][1].areaName;
        const len = checkboxPropsCodeOrder.value.push({
            areaName,
            table: [],
        });
        const table = checkboxPropsCodeOrder.value[len - 1].table;
        for (let rowId = 0; rowId < datas.length; rowId += chunkSize) {
            const rowLen = table.push([]);
            const row = table[rowLen - 1];
            for (
                let index = rowId;
                index < rowId + chunkSize && index < datas.length;
                index++
            ) {
                row.push({
                    groupId: "pref",
                    id: datas[index][0],
                    label: datas[index][1].prefName,
                });
            }
        }
    }

    checkboxPropsNameOrderAsc1d.value = prefIdIndexDatas
        .sort((a, b) => {
            if (a[1].prefNameJP < b[1].prefNameJP) {
                return -1;
            } else if (a[1].prefNameJP > b[1].prefNameJP) {
                return 1;
            } else {
                return 0;
            }
        })
        .map((data) => {
            return {
                groupId: "pref",
                id: data[0],
                label: data[1].prefName,
            };
        });

    isPrefIndexDatasLoadedRef.value = true;
};

const tabContainerTabProps = [
    {
        id: "code-order",
        label: "都道府県コード順",
    },
    {
        id: "name-order",
        label: "名前順",
    },
];

// defineEmits<{change: EmitChangeParamerType}>(); のように使う
type EmitChangeParameterType = [prefCodes: number[]];

// check-boxのonChangeでIdを受け取る
// 返り値はemit('change')するときの引数にする
const emitOnChangeFuncParameter = (id: number): number[] => {
    if (checkedPrefIdsSet.value.has(id)) {
        checkedPrefIdsSet.value.delete(id);
    } else {
        checkedPrefIdsSet.value.add(id);
    }
    return Array.from(checkedPrefIdsSet.value);
};

export {
    isPrefIndexDatasLoaded,
    checkboxPropsCodeOrder,
    isPrefIdCheckedComputed,
    nameSortOrderDropDownProps,
    nameSortOrderDropDownValue,
    checkboxPropsNameOrder,
    nameSortOrderDropDownOnChanged,
    onMountedFunctor,
    emitOnChangeFuncParameter,
    tabContainerTabProps,
    type EmitChangeParameterType,
};
