import { mount } from "@vue/test-utils";
import checkBoxVue from "../../../src/pages/atoms/check-box.vue";
import { describe, it, expect } from "vitest";

describe("check-box.vue", () => {
    const props = {
        groupId: "prefecture",
        id: 1,
        label: "北海道",
    };
    it("propsの値がcheckboxに反映される", () => {
        const wrapper = mount(checkBoxVue, {
            props,
        });

        expect(wrapper.find("label").text()).toBe(props.label);
        expect(wrapper.find("input").attributes("id")).toBe(
            `${props.groupId}#${props.id}`,
        );
    });
    it("入力の際@changeがemitされ引数は1になる", () => {
        const wrapper = mount(checkBoxVue, {
            props,
        });
        // off -> on
        wrapper.find("input").trigger("change");
        expect(wrapper.emitted("change")).toMatchObject([[1]]);
        // on -> off
        wrapper.find("input").trigger("change");
        expect(wrapper.emitted("change")).toMatchObject([[1], [1]]);
    });
});
