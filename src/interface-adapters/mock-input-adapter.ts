import type {
    PopulationData,
    PrefectureData,
} from "../entities/prefecture-data";
import type DataInputInterface from "../usecases/data-input-interface";

export default class MockInputAdapter implements DataInputInterface {
    async getPrefectureCodes(): Promise<Map<number, string>> {
        return new Map([
            [1, "都道府県1"],
            [2, "都道府県2"],
            [3, "都道府県3"],
        ]);
    }

    async getPrefectureData(prefectureCode: number): Promise<PrefectureData> {
        if (prefectureCode < 1 || prefectureCode > 3) {
            throw new Error("Invalid prefecture code");
        }
        const base: Array<[number, PopulationData]> = [
            [
                2015,
                {
                    value: prefectureCode * 100_000 + 50_000,
                    type: "actual",
                },
            ],
            [
                2020,
                {
                    value: prefectureCode * 100_000 + 100_000,
                    type: "actual",
                },
            ],
            [
                2025,
                {
                    value: prefectureCode * 100_000 + 150_000,
                    type: "estimate",
                },
            ],
            [
                2030,
                {
                    value: prefectureCode * 100_000 + 200_000,
                    type: "estimate",
                },
            ],
        ];
        return {
            totalPopulation: new Map(base),
            youngPopulation: new Map(
                base.map(([year, data]) => [
                    year,
                    {
                        value: data.value * 0.3,
                        type: data.type,
                    },
                ]),
            ),
            workingPopulation: new Map(
                base.map(([year, data]) => [
                    year,
                    {
                        value: data.value * 0.5,
                        type: data.type,
                    },
                ]),
            ),
            elderlyPopulation: new Map(
                base.map(([year, data]) => [
                    year,
                    {
                        value: data.value * 0.2,
                        type: data.type,
                    },
                ]),
            ),
        };
    }
}
