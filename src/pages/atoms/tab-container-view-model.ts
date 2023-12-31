import { ref } from "vue";

interface DefinePropsType {
    tabProps: Array<{
        id: string;
        label: string;
    }>;
}

const currentTabId = ref<string>();

// onMountedで実行する関数
const onMountedFunctor = (props: DefinePropsType): void => {
    currentTabId.value = props.tabProps[0].id;
};

const tabSelectorOnClick = (id: string): void => {
    currentTabId.value = id;
};

export {
    type DefinePropsType,
    currentTabId,
    onMountedFunctor,
    tabSelectorOnClick,
};
