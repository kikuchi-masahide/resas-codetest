import { ref } from "vue";
import useEntityDataStore from "../../usecases/entitiy-data-store";

// 一行四項目の表としてチェックボックスを表示するため、
// 一行分のpropsを配列で表現する
const checkboxProps = ref<
    Array<{
        rowIndex: number;
        cols: Array<{
            colIndex: number;
            data: { groupId: string; id: number; label: string };
        }>;
    }>
>();

const checkedPrefIds = ref(new Set<number>());

const onMountedFunctor = async (): Promise<void> => {
    const store = useEntityDataStore();
    const codes = Array.from(await store.getPrefectureCodes());
    // codesを4つずつに分割する
    const chunkSize = 4;
    const chunkedCodes = new Array<Array<[number, string]>>();
    for (let i = 0; i < codes.length; i += chunkSize) {
        chunkedCodes.push(codes.slice(i, i + chunkSize));
    }
    checkboxProps.value = [];
    for (const [rowIndex, row] of chunkedCodes.entries()) {
        checkboxProps.value.push({
            rowIndex,
            cols: [],
        });
        for (const [colIndex, [id, label]] of row.entries()) {
            checkboxProps.value[rowIndex].cols.push({
                colIndex,
                data: {
                    groupId: "pref",
                    id,
                    label,
                },
            });
        }
    }
};

// defineEmits<{change: EmitChangeParamerType}>(); のように使う
type EmitChangeParameterType = [prefCodes: number[]];

// check-boxのonChangeでIdを受け取る
// 返り値はemit('change')するときの引数にする
const emitOnChangeFuncParameter = (id: number): number[] => {
    if (checkedPrefIds.value.has(id)) {
        checkedPrefIds.value.delete(id);
    } else {
        checkedPrefIds.value.add(id);
    }
    return Array.from(checkedPrefIds.value);
};

export {
    checkboxProps,
    onMountedFunctor,
    emitOnChangeFuncParameter,
    type EmitChangeParameterType,
};
