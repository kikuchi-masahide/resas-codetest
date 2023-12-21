import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import instantiateInputAdapter from "../../src/interface-adapters/instantiate-input-adapter";
import type { PrefectureData } from "../../src/entities/prefecture-data";
import * as getInputAdapterType from "../../src/interface-adapters/get-input-adapter-type";

describe("MockInputAdapter", () => {
    beforeEach(() => {
        // getInputAdapterTypeが"mock"を返すようにする
        vi.spyOn(getInputAdapterType, "default").mockReturnValue("mock");
    });
    afterEach(() => {
        // getInputAdapterTypeを元に戻す
        vi.spyOn(getInputAdapterType, "default").mockRestore();
    });
    it("should return prefecture codes", () => {
        const adapter = instantiateInputAdapter();
        // adapter.getPrefectureCodes()の返り値の型を確認
        expect(adapter.getPrefectureCodes()).toBeInstanceOf(
            Promise<Map<number, string>>,
        );
        // adapter.getPrefectureCodes()がエラーにならないことを確認
        expect(async () => await adapter.getPrefectureCodes()).not.toThrow();
        // adapter.getPrefectureCodes()の返り値の内容を確認
        expect(adapter.getPrefectureCodes()).toBeInstanceOf(
            Promise<PrefectureData>,
        );
    });
    it("should return prefecture data", () => {
        const adapter = instantiateInputAdapter();
        // adapter.getPrefectureData()がエラーにならないことを確認
        expect(async () => await adapter.getPrefectureData(1)).not.toThrow();
        // adapter.getPrefectureData()の返り値の型を確認
        expect(adapter.getPrefectureData(1)).toBeInstanceOf(
            Promise<PrefectureData>,
        );
    });
    it("should throw error", async () => {
        const adapter = instantiateInputAdapter();
        // 範囲外のコードを指定した時throwすることを確認
        await expect(adapter.getPrefectureData(0)).rejects.toThrow();
        await expect(adapter.getPrefectureData(48)).rejects.toThrow();
    });
});
