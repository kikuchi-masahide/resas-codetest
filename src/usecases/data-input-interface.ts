import type {
    PrefectureData,
    PrefectureIndexData,
} from "../entities/prefecture-data";

export default interface DataInputInterface {
    getPrefectureIndexDatas: () => Promise<Map<number, PrefectureIndexData>>;
    getPrefectureData: (prefectureCode: number) => Promise<PrefectureData>;
}
