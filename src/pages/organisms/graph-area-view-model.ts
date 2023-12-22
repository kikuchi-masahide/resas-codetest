import { ref } from "vue";
import useEntityDataStore from "../../usecases/entitiy-data-store";
import { type PopulationData } from "../../entities/prefecture-data";

interface DefinePropsType {
    checkedPrefCodes: number[];
}

// 表示する値のタイプ(総人口/年少人口/生産年齢人口/老年人口)
type ValueType = "total" | "young" | "working" | "elderly";
const valueType = ref<ValueType>("total");
const valueTypeDropboxItems = [
    {
        label: "総人口",
        value: 0,
    },
    {
        label: "年少人口",
        value: 1,
    },
    {
        label: "生産年齢人口",
        value: 2,
    },
    {
        label: "老年人口",
        value: 3,
    },
];

const checkedPrefCodes = ref(new Array<number>());
const xAxisCategories = ref(new Array<string>());
const yAxisSeries = ref(
    new Array<{
        name: string;
        data: Array<{
            x: string;
            y: number;
            dashStyle?: "Solid" | "Dash";
        }>;
    }>(),
);

// 表示する値のタイプがdropdownで変更されたときの関数
const onValueTypeChange = (value: number): void => {
    switch (value) {
        case 0:
            valueType.value = "total";
            break;
        case 1:
            valueType.value = "young";
            break;
        case 2:
            valueType.value = "working";
            break;
        case 3:
            valueType.value = "elderly";
            break;
    }
    void setGraphDatas();
};

// props.checkedPrefCodesをwatchするための関数
const watchCheckedPrefCodes = async (newValue: number[]): Promise<void> => {
    console.log("watchCheckedPrefCodes");
    console.log(newValue);
    checkedPrefCodes.value = newValue;
    await setGraphDatas();
};

// checkedPrefCodesとvalueTypeからグラフのデータを取得する
async function setGraphDatas(): Promise<void> {
    const store = useEntityDataStore();
    const prefCodes = await store.getPrefectureCodes();
    const xAxisCategoriesSet = new Set<string>();
    const yAxisSeriesArray = new Array<{
        name: string;
        data: Array<{
            x: string;
            y: number;
            dashStyle?: "Solid" | "Dash";
        }>;
    }>();

    for (const code of checkedPrefCodes.value) {
        const name = prefCodes.get(code);
        if (name === undefined) {
            continue;
        }
        const prefData = await store.getPrefectureData(code);
        let populationData = new Map<number, PopulationData>();
        switch (valueType.value) {
            case "total":
                populationData = prefData.totalPopulation;
                break;
            case "young":
                populationData = prefData.youngPopulation;
                break;
            case "working":
                populationData = prefData.workingPopulation;
                break;
            case "elderly":
                populationData = prefData.elderlyPopulation;
                break;
        }
        const newSeriesIndex =
            yAxisSeriesArray.push({
                name,
                data: [],
            }) - 1;
        for (const [year, data] of populationData) {
            xAxisCategoriesSet.add(year.toString());
            yAxisSeriesArray[newSeriesIndex].data.push({
                x: year.toString(),
                y: data.value,
                dashStyle: data.type === "estimate" ? "Dash" : "Solid",
            });
        }
    }
    xAxisCategories.value = Array.from(xAxisCategoriesSet).sort();
    yAxisSeries.value = yAxisSeriesArray;
    console.log(xAxisCategories.value);
    console.log(yAxisSeries.value);
}

export {
    type DefinePropsType,
    valueTypeDropboxItems,
    xAxisCategories,
    yAxisSeries,
    onValueTypeChange,
    watchCheckedPrefCodes,
};
