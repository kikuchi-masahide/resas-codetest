import { inject, ref } from "vue";
import { type PopulationData } from "../../entities/prefecture-data";
import entityDataStoreKey from "@/entity-data-store-key";
import type EntityDataStore from "@/usecases/entitiy-data-store";

interface DefinePropsType {
    checkedPrefCodes: number[];
}

let store: undefined | EntityDataStore;

const onMountedFunctor = (): void => {
    store = inject(entityDataStoreKey);
    if (store === undefined) {
        throw new Error("Entity data store not found");
    }
};

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
// 各都道府県に対応する線の色(checkedPrefCodesに含まれない都道府県がある可能性が有る)
const lineColors = ref(new Map<number, string>());
const xAxisCategories = ref(new Array<number>());
const yAxisSeries = ref(
    new Array<{
        name: string;
        color: string;
        dashStyle?: "Solid" | "Dash";
        data: Array<{
            x: number;
            y: number;
        }>;
        showInLegend: boolean;
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
    checkedPrefCodes.value = newValue;
    await setGraphDatas();
};

// checkedPrefCodesとvalueTypeからグラフのデータを取得する
async function setGraphDatas(): Promise<void> {
    if (store === undefined) {
        throw new Error("Entity data store not found");
    }
    const prefIndexDatas = await store.getPrefectureIndexDatas();
    const xAxisCategoriesSet = new Set<number>();
    const yAxisSeriesArray = new Array<{
        name: string;
        dashStyle?: "Solid" | "Dash";
        color: string;
        data: Array<{
            x: number;
            y: number;
        }>;
        showInLegend: boolean;
    }>();

    for (const code of checkedPrefCodes.value) {
        const indexData = prefIndexDatas.get(code);
        if (indexData === undefined) {
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
        // 年度でソートする
        const populationDataArray = Array.from(populationData).sort(
            (a, b) => a[0] - b[0],
        );
        // 実線/点線で結ぶデータ
        const solidSeriesData = new Array<{ x: number; y: number }>();
        const dashSeriesData = new Array<{ x: number; y: number }>();
        let prevData = populationDataArray[0];
        for (const [year, data] of populationDataArray) {
            xAxisCategoriesSet.add(year);
            if (data.type === "actual") {
                solidSeriesData.push({ x: year, y: data.value });
            } else {
                // dashSeriesDataの長さが0ならば今のdataが初めての推測値"estimate"
                // 1つ前のデータも追加する
                if (dashSeriesData.length === 0) {
                    dashSeriesData.push({
                        x: prevData[0],
                        y: prevData[1].value,
                    });
                }
                dashSeriesData.push({ x: year, y: data.value });
            }
            prevData = [year, data];
        }
        // 線の色を求める
        let color = lineColors.value.get(code);
        if (color === undefined) {
            // 色が決まっていない都道府県に対してランダムに色を設定する
            color = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
            lineColors.value.set(code, color);
        }
        yAxisSeriesArray.push({
            name: indexData.prefName,
            color,
            data: solidSeriesData,
            showInLegend: true,
        });
        yAxisSeriesArray.push({
            name: `${indexData.prefName}(推計)`,
            dashStyle: "Dash",
            color,
            data: dashSeriesData,
            showInLegend: false,
        });
    }
    // 年度昇順でソート
    xAxisCategories.value = Array.from(xAxisCategoriesSet).sort(
        (a, b) => a - b,
    );
    yAxisSeries.value = yAxisSeriesArray;
}

export {
    onMountedFunctor,
    type DefinePropsType,
    valueTypeDropboxItems,
    xAxisCategories,
    yAxisSeries,
    onValueTypeChange,
    watchCheckedPrefCodes,
};
