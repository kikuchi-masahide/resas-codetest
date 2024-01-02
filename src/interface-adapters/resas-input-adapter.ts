import type {
    PopulationData,
    PrefectureData,
    PrefectureIndexData,
} from "../entities/prefecture-data";
import * as resasPrefCodes from "./resas-prefcodes.json";
import type DataInputInterface from "../usecases/data-input-interface";

interface ResasPrefCodesJTD {
    areas: Array<{
        areaCode: number;
        areaName: string;
    }>;
    prefs: Array<{
        prefCode: number;
        prefName: string;
        prefNameJP: string;
        areaCode: number;
    }>;
}

interface PopulationCompositionPerYearResponse {
    message: null;
    result: {
        boundaryYear: number;
        data: Array<{
            label: string;
            data: Array<{
                year: number;
                value: number;
            }>;
        }>;
    } | null;
}

export default class RESASInputAdapter implements DataInputInterface {
    async getPrefectureIndexDatas(): Promise<Map<number, PrefectureIndexData>> {
        const areaCodeNameMap = new Map<number, string>();
        for (const { areaCode, areaName } of (
            resasPrefCodes as ResasPrefCodesJTD
        ).areas) {
            areaCodeNameMap.set(areaCode, areaName);
        }
        const prefCodeIndexMap = new Map<number, PrefectureIndexData>();
        for (const { prefCode, prefName, prefNameJP, areaCode } of (
            resasPrefCodes as ResasPrefCodesJTD
        ).prefs) {
            prefCodeIndexMap.set(prefCode, {
                prefCode,
                prefName,
                prefNameJP,
                areaCode,
                areaName: areaCodeNameMap.get(areaCode) ?? "",
            });
        }
        return prefCodeIndexMap;
    }

    async getPrefectureData(prefectureCode: number): Promise<PrefectureData> {
        const response = await this.get<PopulationCompositionPerYearResponse>(
            `api/v1/population/composition/perYear?prefCode=${prefectureCode}&cityCode=-`,
        );
        if (response.result === null) {
            throw new Error("Invalid prefecture code");
        }
        const totalPopulation = new Map<number, PopulationData>();
        const youngPopulation = new Map<number, PopulationData>();
        const workingPopulation = new Map<number, PopulationData>();
        const elderlyPopulation = new Map<number, PopulationData>();
        const boundaryYear = response.result.boundaryYear;
        for (const { label, data } of response.result.data) {
            for (const { year, value } of data) {
                const type = year <= boundaryYear ? "actual" : "estimate";
                switch (label) {
                    case "総人口":
                        totalPopulation.set(year, { value, type });
                        break;
                    case "年少人口":
                        youngPopulation.set(year, { value, type });
                        break;
                    case "生産年齢人口":
                        workingPopulation.set(year, { value, type });
                        break;
                    case "老年人口":
                        elderlyPopulation.set(year, { value, type });
                        break;
                }
            }
        }
        return {
            totalPopulation,
            youngPopulation,
            workingPopulation,
            elderlyPopulation,
        };
    }

    // cacheをチェックした後、必要ならばAPIキーを使ってデータを取得する
    // path: 'api/v1/'から始まるパス
    private async get<T>(path: string): Promise<T> {
        const cache = await caches.open("resas");
        const url = "https://opendata.resas-portal.go.jp/" + path;
        let cachedData = await cache.match(url);
        if (cachedData === undefined || cachedData.status !== 200) {
            const headers = {
                "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY,
            };
            await cache.add(new Request(url, { headers, mode: "cors" }));
            cachedData = await cache.match(url);
            if (cachedData === undefined || cachedData.status !== 200) {
                throw new Error("Failed to fetch data");
            }
        }
        return (await cachedData.json()) as T;
    }
}
