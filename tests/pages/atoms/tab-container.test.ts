import { mount } from "@vue/test-utils";
import tabContainerVue from "@/pages/atoms/tab-container.vue";
import {describe, it, expect} from "vitest";

describe("tab-container.vue", () => {
    const props = {
        tabProps:[
            {
                id: "tab1",
                label: "tab1",
            },
            {
                id: "tab2",
                label: "tab2",
            },
            {
                id: "tab3",
                label: "tab3",
            }
        ]
    };
    const slots = {
        tab1: "<p>tab1</p>",
        tab2: "<p>tab2</p>",
        tab3: "<p>tab3</p>",
    };
    it("labelの値が表示されたタブ切り替えボタンが表示される", () =>{
        const wrapper = mount(tabContainerVue, {props,slots});
        // tabPropsの各要素について、labelをtextとして持つdivが存在する
        for(const tabProp of props.tabProps){
            expect(wrapper.find(`div#${tabProp.id}`).text()).toBe(tabProp.label);
        }
    });
    it("タブ切り替えボタンを押すと表示コンテンツが切り替わる", async () => {
        const wrapper = mount(tabContainerVue, {props, slots});
        const slotsMap = new Map(Object.entries(slots));
        for(const tabProp of props.tabProps){
            // labelの値が表示されたボタンを押す
            await wrapper.find(`div#${tabProp.id}`).trigger("click");
            // div要素の中身が、slotsMapの値と一致する
            const element = wrapper.find(`div#${tabProp.id}`);
            // elementの子要素を取得
            expect(element.element.children.length).toBe(1)
            const child = element.element.children[0];
            // 子要素の中身が、slotsMapの値と一致する
            expect(child.outerHTML).toBe(slotsMap.get(tabProp.id));
        }
    });
});