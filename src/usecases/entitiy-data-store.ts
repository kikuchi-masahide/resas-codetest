import { defineStore } from "pinia";
import type { PrefectureData } from "../entities/prefecture-data";
import type DataInputInterface from "./data-input-interface";

const useEntityDataStore = defineStore({
    id: "entityDataStore",
    state: () => ({
        _inputAdapter: undefined as undefined | DataInputInterface,
    }),
    actions: {
        setupInputAdapter(inputAdapter: DataInputInterface) {
            if (this._inputAdapter !== undefined) {
                throw new Error("Input adapter is already set");
            }
            this._inputAdapter = inputAdapter;
        },
    },
});

export default useEntityDataStore;
