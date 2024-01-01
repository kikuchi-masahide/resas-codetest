interface PopulationData {
    value: number;
    // 実測値(actual)か推計値(estimate)か
    type: "actual" | "estimate";
}

interface PrefectureData {
    // 総人口<年度,データ>
    totalPopulation: Map<number, PopulationData>;
    // 年少人口<年度,データ>
    youngPopulation: Map<number, PopulationData>;
    // 生産年齢人口<年度,データ>
    workingPopulation: Map<number, PopulationData>;
    // 老年人口<年度,データ>
    elderlyPopulation: Map<number, PopulationData>;
}

interface PrefectureIndexData {
    prefCode: number;
    // 都道府県名(漢字表記)
    prefName: string;
    // 都道府県名(カナ表記)
    prefNameJP: string;
    // 地方コード
    areaCode: number;
    // 地方名
    areaName: string;
}

export type { PopulationData, PrefectureData, PrefectureIndexData };
