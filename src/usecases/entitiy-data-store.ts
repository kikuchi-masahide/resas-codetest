import { defineStore } from "pinia";
import type { PrefectureData } from "../entities/prefecture-data";
import type DataInputInterface from "./data-input-interface";

const useEntityDataStore = defineStore({
    id: "entityDataStore",
    state: () => ({
        _inputAdapter: undefined as undefined | DataInputInterface,
        _prefectureCodes: undefined as Map<number, string> | undefined,
        _prefectureDatas: new Map<number, PrefectureData>(),
    }),
    actions: {
        setupInputAdapter(inputAdapter: DataInputInterface) {
            if (this._inputAdapter !== undefined) {
                throw new Error("Input adapter is already set");
            }
            this._inputAdapter = inputAdapter;
        },
        async getPrefectureCodes(): Promise<Map<number, string>> {
            if (this._inputAdapter === undefined) {
                throw new Error("Input adapter not found");
            }
            const codes = this._prefectureCodes;
            if (codes === undefined) {
                const newCodes = await this._inputAdapter.getPrefectureCodes();
                this._prefectureCodes = newCodes;
                return newCodes;
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
                this._prefectureCodes === undefined ||
                !this._prefectureCodes.has(prefectureCode)
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
