import { computed, ref } from "vue";

interface DefinePropsType {
    tabProps: Array<{
        id: string;
        label: string;
    }>;
}

const currentTabIdRef = ref<string>();
const currentTabId = computed(() => currentTabIdRef.value);

// onMountedで実行する関数
const onMountedFunctor = (props: DefinePropsType): void => {
    currentTabIdRef.value = props.tabProps[0].id;
};

const tabSelectorOnClick = (id: string): void => {
    currentTabIdRef.value = id;
};

export {
    type DefinePropsType,
    currentTabId,
    onMountedFunctor,
    tabSelectorOnClick,
};
