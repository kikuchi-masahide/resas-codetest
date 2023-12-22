import { describe, it, expect, vi } from "vitest";
import instantiateInputAdapter from "@/interface-adapters/instantiate-input-adapter";
import * as getInputAdapterType from "@/interface-adapters/get-input-adapter-type";

describe("instantiateInputAdapter", () => {
    it("should return a RESAS input adapter", () => {
        const adapter = instantiateInputAdapter();
        // adapterがRESASInputAdapterクラスのインスタンスであることを確認する
        expect(adapter).toBeDefined();
        expect(adapter.constructor.name).toBe("RESASInputAdapter");
    });
    it("should return a mock input adapter", () => {
        // getInputAdapterTypeが"mock"を返すようにする
        const spy = vi
            .spyOn(getInputAdapterType, "default")
            .mockReturnValue("mock");
        const adapter = instantiateInputAdapter();
        // adapterがMockInputAdapterクラスのインスタンスであることを確認する
        expect(adapter).toBeDefined();
        console.log(adapter);
        expect(adapter.constructor.name).toBe("MockInputAdapter");
        spy.mockRestore();
    });
});
