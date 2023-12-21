import type { PrefectureData } from "../entities/prefecture-data";

export default interface DataInputInterface {
    getPrefectureCodes: () => Promise<Map<number, string>>;
    getPrefectureData: (prefectureCode: number) => Promise<PrefectureData>;
}
