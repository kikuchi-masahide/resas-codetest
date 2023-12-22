import { ref } from "vue";
import useEntityDataStore from "../../usecases/entitiy-data-store";

const checkboxProps =
    ref<Array<{ groupId: string; id: number; label: string }>>();

const checkedPrefIds = ref(new Set<number>());

const onMountedFunctor = async (): Promise<void> => {
    const store = useEntityDataStore();
    const codes = await store.getPrefectureCodes();
    checkboxProps.value = Array.from(codes.entries()).map(([id, label]) => ({
        groupId: "prefecture",
        id,
        label,
    }));
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
