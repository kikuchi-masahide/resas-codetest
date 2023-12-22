import { mount } from "@vue/test-utils";
import dropDownVue from "@/pages/atoms/drop-down.vue";
import { describe, it, expect } from "vitest";

describe("drop-down.vue", () => {
    const props = {
        elementId: "drop-down",
        label: "ドロップダウン",
        items: [
            {
                label: "アイテム0",
                value: 0,
            },
            {
                label: "アイテム1",
                value: 1,
            },
            {
                label: "アイテム2",
                value: 2,
            },
            {
                label: "アイテム3",
                value: 3,
            },
        ],
    };
    it("propsの値がdrop-downに反映される", () => {
        const wrapper = mount(dropDownVue, {
            props,
        });

        expect(wrapper.find("label").text()).toBe(props.label);
        expect(wrapper.find("select").attributes("id")).toBe("drop-down");
        expect(wrapper.findAll("option").length).toBe(props.items.length);
        // 初期選択肢がprops[0]になっているか
        expect(wrapper.find("option:checked").text()).toBe(
            props.items[0].label,
        );
    });
    it("入力の際@changeがemitされ引数は選択した値になる", () => {
        const wrapper = mount(dropDownVue, {
            props,
        });
        // 0 -> 1
        wrapper.find("select").setValue(1);
        expect(wrapper.emitted("change")).toMatchObject([[1]]);
        expect(wrapper.find("option:checked").text()).toBe(
            props.items[1].label,
        );
        // 1 -> 2
        wrapper.find("select").setValue(2);
        expect(wrapper.emitted("change")).toMatchObject([[1], [2]]);
        expect(wrapper.find("option:checked").text()).toBe(
            props.items[2].label,
        );
    });
});
