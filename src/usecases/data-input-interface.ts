import type {
    PrefectureData,
    PrefectureIndexData,
} from "../entities/prefecture-data";

interface DataInputInterface {
    getPrefectureIndexDatas: () => Promise<Map<number, PrefectureIndexData>>;
    getPrefectureData: (prefectureCode: number) => Promise<PrefectureData>;
}

export default DataInputInterface;
