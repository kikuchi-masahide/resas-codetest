import { describe, it, expect } from "vitest";
import instantiateInputAdapter from "../../src/interface-adapters/instantiate-input-adapter";
import type { PrefectureData } from "../../src/entities/prefecture-data";

describe("RESASInputAdapter", () => {
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
    it("should return prefecture data", async () => {
        const adapter = instantiateInputAdapter();
        // adapter.getPrefectureData()がエラーにならないことを確認
        expect(async () => await adapter.getPrefectureData(1)).not.toThrow();
        // adapter.getPrefectureData()の返り値の型を確認
        expect(adapter.getPrefectureData(1)).toBeInstanceOf(
            Promise<PrefectureData>,
        );
        const prefectureData = await adapter.getPrefectureData(1);
        // 各年度のデータについて、実測値/予測値の種別が正しいことを確認
        prefectureData.totalPopulation.forEach((data, key) => {
            if (key <= 2023) {
                expect(data.type).toBe("actual");
            } else {
                expect(data.type).toBe("estimate");
            }
        });
        prefectureData.youngPopulation.forEach((data, key) => {
            if (key <= 2023) {
                expect(data.type).toBe("actual");
            } else {
                expect(data.type).toBe("estimate");
            }
        });
        prefectureData.workingPopulation.forEach((data, key) => {
            if (key <= 2023) {
                expect(data.type).toBe("actual");
            } else {
                expect(data.type).toBe("estimate");
            }
        });
        prefectureData.elderlyPopulation.forEach((data, key) => {
            if (key <= 2023) {
                expect(data.type).toBe("actual");
            } else {
                expect(data.type).toBe("estimate");
            }
        });
    });
    it("should throw error", async () => {
        const adapter = instantiateInputAdapter();
        // 範囲外のコードを指定した時throwすることを確認
        await expect(adapter.getPrefectureData(0)).rejects.toThrow();
        await expect(adapter.getPrefectureData(48)).rejects.toThrow();
    });
});
