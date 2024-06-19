<template>
    <div class="k-tabs">
        <div class="k-tabs-tags">
            <div
                class="k-tabs-tag-item"
                v-for="pane of tabsContainer.paneInfos"
                :key="pane.id"
                :ref="el => tabsContainer.getPanes(el, pane.id)"
                @click="tabsContainer.switchLabel(pane.id)"
            >
                <span :class="pane.labelClass"></span>
                <span>{{ pane.label }}</span>
            </div>
            <div :ref="el => tabsContainer.hoverBar = el" class="hover-bar"></div>
        </div>
        <div class="k-tabs-content">
            <slot></slot>
        </div>
    </div>
</template>


<script setup>
import { reactive, useSlots, provide, nextTick } from 'vue';

const slots = useSlots();

function getCurrentSlotChildren() {
    const defaultVnodes = slots.default();
    let defaultChildren = [];
    // 内部使用 v-for
    // TODO: more elegant ?
    if (defaultVnodes.length === 1 && defaultVnodes[0].children && defaultVnodes[0].children[0].type.name === 'k-pane') {
        defaultChildren = defaultVnodes[0].children;
    } else {
        defaultChildren = defaultVnodes.filter(vnode => vnode.type && vnode.type.name === 'k-pane');
    }
    return defaultChildren;
}

/**
 * 根据当前 pane 的编号 id 改变 hover bar 的 width 和 水平位移 形成动画
 * @param {number} id 
 */
function hoverBarAnimation(id) {
    const hoverBar = tabsContainer.hoverBar;
    let offsetX = 0;
    for (let i = 0; i < id; ++ i) {
        offsetX += tabsContainer.panes[i].offsetWidth;
    }
    const currentPane = tabsContainer.panes[id];
    const height = currentPane.offsetHeight;
    const width = currentPane.offsetWidth;

    hoverBar.style.transform = `translateX(${offsetX}px)`;
    // 1.75 是 k-tabs-tags 的 border-bottom
    hoverBar.style.height = height + 1.75 + 'px';
    hoverBar.style.width = width + 'px';
    currentPane.style.color = 'white';

    setTimeout(() => {
        const lastId = tabsContainer.lastPaneId;
        if (lastId !== undefined && lastId !== id) {
            tabsContainer.panes[lastId].style.color = 'rgb(16, 16, 16)';
        }
        tabsContainer.lastPaneId = id;
    }, 200);
}

const tabsContainer = reactive({
    paneInfos: [],
    panes: [],
    lastPaneId: undefined,
    activeLabel: '',
    hoverBar: null,
    getPanes(el, id) {
        tabsContainer.panes[id] = el;
    },
    switchLabel(id) {
        if (tabsContainer.lastPaneId === id) {
            return;
        }
        tabsContainer.activeLabel = tabsContainer.paneInfos[id].label;
        // 标签移动动画
        nextTick(() => {
            hoverBarAnimation(id);
        });
    },
    updateLabels() {
        const defaultChildren = getCurrentSlotChildren();
        tabsContainer.paneInfos = [];
        for (const index in defaultChildren) {
            const vnode = defaultChildren[index];
            tabsContainer.paneInfos.push({
                id: index,
                label: vnode.props.label || '',
                labelClass: vnode.props.labelClass || '',
            });
        }
        if (tabsContainer.paneInfos.length > 0) {
            // 默认使用第一个元素进行初始化
            tabsContainer.activeLabel = tabsContainer.paneInfos[0].label;
            nextTick(() => {
                hoverBarAnimation(0);
            });
        }
    }
});

tabsContainer.updateLabels();
tabsContainer.switchLabel(0);

provide('tabsContainer', tabsContainer);

</script>

<style>
.k-tabs {
    position: relative;
    background-color: var(--transplant-main-color-3);
}

.k-tabs-tags {
    display: flex;
    margin-bottom: 5px;
    padding: 9px 10px;
    width: 100%;
    position: relative;
}

@media screen and (max-width: 414px) {
    .k-tabs-tags {
        overflow-x: scroll
    }
}

.k-tabs-tag-item {
    box-sizing: border-box;
    color: rgb(16, 16, 16);
    font-family: var(--base-font);
    padding: 10px 12px 6px;
    cursor: pointer;
    font-size: 16px;
    z-index: 2;
    white-space: nowrap;
    user-select: none;
}

.hover-bar {
    background-color: var(--main-color);
    border-radius: .9em;
    transition: .35s ease-in-out;
    position: absolute;
}

</style>