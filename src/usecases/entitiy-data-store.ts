import { defineStore } from "pinia";
import type { PrefectureData, PrefectureIndexData } from "../entities/prefecture-data";
import type DataInputInterface from "./data-input-interface";

const useEntityDataStore = defineStore({
    id: "entityDataStore",
    state: () => ({
        _inputAdapter: undefined as undefined | DataInputInterface,
        _prefectureIndexDatas: undefined as Map<number, PrefectureIndexData> | undefined,
        _prefectureDatas: new Map<number, PrefectureData>(),
    }),
    actions: {
        setupInputAdapter(inputAdapter: DataInputInterface) {
            if (this._inputAdapter !== undefined) {
                throw new Error("Input adapter is already set");
            }
            this._inputAdapter = inputAdapter;
        },
        async getPrefectureIndexDatas(): Promise<Map<number, PrefectureIndexData>> {
            if (this._inputAdapter === undefined) {
                throw new Error("Input adapter not found");
            }
            const codes = this._prefectureIndexDatas;
            if (codes === undefined) {
                this._prefectureIndexDatas = await this._inputAdapter.getPrefectureIndexDatas();
                return this._prefectureIndexDatas;
            } else {
                return codes;
            }
        },
        async getPrefectureData(
            prefectureCode: number,
        ): Promise<PrefectureData> {
            if (this._inputAdapter === undefined) {
                throw new Error("Input adapter not found");
            }
            if (
                this._prefectureIndexDatas === undefined ||
                !this._prefectureIndexDatas.has(prefectureCode)
            ) {
                throw new Error("Invalid prefecture code");
            }
            const data = this._prefectureDatas.get(prefectureCode);
            if (data !== undefined) {
                return data;
            } else {
                const newData =
                    await this._inputAdapter.getPrefectureData(prefectureCode);
                this._prefectureDatas.set(prefectureCode, newData);
                return newData;
            }
        },
    },
});

export default useEntityDataStore;
