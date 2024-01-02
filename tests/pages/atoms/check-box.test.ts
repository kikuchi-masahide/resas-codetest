import { mount } from "@vue/test-utils";
import checkBoxVue from "@/pages/atoms/check-box.vue";
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
    it("propsのcheckedの指定が正しく反映されている", () => {
        const wrapper0 = mount(checkBoxVue, {
            props: {
                ...props,
            },
        });
        expect(wrapper0.find("input").element.checked).toBe(false);
        const wrapper1 = mount(checkBoxVue, {
            props: {
                ...props,
                checked: false,
            },
        });
        expect(wrapper1.find("input").element.checked).toBe(false);
        const wrapper2 = mount(checkBoxVue, {
            props: {
                ...props,
                checked: true,
            },
        });
        expect(wrapper2.find("input").element.checked).toBe(true);
    });
    it("入力の際@changeがemitされ引数が1になる", async () => {
        const wrapper = mount(checkBoxVue, {
            props,
        });
        // off -> on
        await wrapper.find("input").trigger("change");
        expect(wrapper.emitted("change")?.length).toBe(1);
        expect(wrapper.emitted("change")?.[0]).toEqual([1]);
        // on -> off
        await wrapper.find("input").trigger("change");
        expect(wrapper.emitted("change")?.length).toBe(2);
        expect(wrapper.emitted("change")?.[1]).toEqual([1]);
    });
});
