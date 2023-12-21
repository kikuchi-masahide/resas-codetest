import type {
    PopulationData,
    PrefectureData,
} from "../entities/prefecture-data";
import type DataInputInterface from "../usecases/data-input-interface";

interface PrefectureCodeResponse {
    message: null;
    result: Array<{
        prefCode: number;
        prefName: string;
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
    async getPrefectureCodes(): Promise<Map<number, string>> {
        const response =
            await this.get<PrefectureCodeResponse>("api/v1/prefectures");
        const codes = new Map<number, string>();
        for (const { prefCode, prefName } of response.result) {
            codes.set(prefCode, prefName);
        }
        return codes;
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

    // APIキーを使ってデータを取得する
    // path: 'api/v1/'から始まるパス
    private async get<T>(path: string): Promise<T> {
        const url = "https://opendata.resas-portal.go.jp/" + path;
        const headers = {
            "X-API-KEY": import.meta.env.VITE_RESAS_API_KEY,
        };
        // GET
        const response = await fetch(url, {
            method: "GET",
            headers,
            mode: "cors",
        });
        if (!response.ok) {
            throw new Error("Failed to fetch");
        }
        return (await response.json()) as T;
    }
}
