import { ref } from "vue";
import useEntityDataStore from "../../usecases/entitiy-data-store";
import { PrefectureIndexData } from "@/entities/prefecture-data";

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
    const indexDatas = Array.from(await store.getPrefectureIndexDatas());
    // codesを4つずつに分割する
    const chunkSize = 4;
    const chunkedIndexDatas = new Array<Array<[number, PrefectureIndexData]>>();
    for (let i = 0; i < indexDatas.length; i += chunkSize) {
        chunkedIndexDatas.push(indexDatas.slice(i, i + chunkSize));
    }
    checkboxProps.value = [];
    for (const [rowIndex, row] of chunkedIndexDatas.entries()) {
        checkboxProps.value.push({
            rowIndex,
            cols: [],
        });
        for (const [colIndex, [id, indexData]] of row.entries()) {
            checkboxProps.value[rowIndex].cols.push({
                colIndex,
                data: {
                    groupId: "pref",
                    id,
                    label: indexData.prefName,
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
