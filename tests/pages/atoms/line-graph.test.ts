import { mount } from "@vue/test-utils";
import lineGraphVue from "@/pages/atoms/line-graph.vue";
import { describe, it, expect, vi } from "vitest";
import * as viewmodel from "@/pages/atoms/line-graph-view-model";

describe("line-graph.vue", () => {
    const props0 = {
        title: "タイトル0",
        xAxisTitle: "x軸タイトル0",
        yAxisTitle: "y軸タイトル0",
        xAxisCategories: [1, 2],
        yAxisSeries: [
            {
                name: "y軸シリーズ0-0",
                color: "#FF0000",
                data: [
                    {
                        x: 1,
                        y: 0,
                    },
                    {
                        x: 2,
                        y: 1,
                    },
                ],
                showInLegend: true,
            },
        ],
    };
    const props1 = {
        title: "タイトル1",
        xAxisTitle: "x軸タイトル1",
        yAxisTitle: "y軸タイトル1",
        xAxisCategories: [1, 2],
        yAxisSeries: [
            {
                name: "y軸シリーズ1-0",
                color: "#FF0000",
                data: [
                    {
                        x: 1,
                        y: 0,
                    },
                    {
                        x: 2,
                        y: 1,
                    },
                ],
                showInLegend: true,
            },
            {
                name: "y軸シリーズ1-1",
                color: "#00FF00",
                dashStyle: "Dash" as "Solid" | "Dash",
                data: [
                    {
                        x: 1,
                        y: 2,
                    },
                    {
                        x: 2,
                        y: 3,
                    },
                ],
                showInLegend: false,
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
