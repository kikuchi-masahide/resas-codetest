import { mount } from "@vue/test-utils";
import lineGraphVue from "@/pages/atoms/line-graph.vue";
import { describe, it, expect, vi } from "vitest";
import * as viewmodel from "@/pages/atoms/line-graph-view-model";

describe("line-graph.vue", () => {
    const props0 = {
        title: "タイトル0",
        xAxisTitle: "x軸タイトル0",
        yAxisTitle: "y軸タイトル0",
        xAxisCategories: ["x軸カテゴリ0-0", "x軸カテゴリ0-1"],
        yAxisSeries: [
            {
                name: "y軸シリーズ0-0",
                color: "#FF0000",
                data: [
                    {
                        x: "x軸カテゴリ0-0",
                        y: 0,
                    },
                    {
                        x: "x軸カテゴリ0-1",
                        y: 1,
                    },
                ],
            },
        ],
    };
    const props1 = {
        title: "タイトル1",
        xAxisTitle: "x軸タイトル1",
        yAxisTitle: "y軸タイトル1",
        xAxisCategories: ["x軸カテゴリ1-0", "x軸カテゴリ1-1"],
        yAxisSeries: [
            {
                name: "y軸シリーズ1-0",
                color: "#FF0000",
                data: [
                    {
                        x: "x軸カテゴリ1-0",
                        y: 0,
                    },
                    {
                        x: "x軸カテゴリ1-1",
                        y: 1,
                    },
                ],
            },
            {
                name: "y軸シリーズ1-1",
                color: "#00FF00",
                dashStyle: "Dash",
                data: [
                    {
                        x: "x軸カテゴリ1-0",
                        y: 2,
                    },
                    {
                        x: "x軸カテゴリ1-1",
                        y: 3,
                    },
                ],
            },
        ],
    };
    it("propsを変更するとグラフが再描画されるか", async () => {
        // getGraphOptions関数の呼び出し回数を確認
        const spy = vi.spyOn(viewmodel, "getGraphOptions");
        const wrapper = mount(lineGraphVue, {
            props: props0,
        });
        expect(spy).toBeCalledTimes(1);
        // propsを変更
        await wrapper.setProps(props1);
        expect(spy).toBeCalledTimes(2);
    });
});
