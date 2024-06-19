<template>
    <transition :name="props.switchAnimation" mode="out-in">
        <div class="k-pane-content" v-show="props.label === tabsContainer.activeLabel">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
import { inject, watch } from 'vue';

export default {
    name: 'k-pane',
    props: {
        label: {
            type: String,
            required: false
        },
        labelClass: {
            type: String,
            required: false
        },
        switchAnimation: {
            type: String,
            default: 'main-fade'
        }
    },
    setup(props) {
        const tabsContainer = inject('tabsContainer');
        // console.log(props.label);
        watch(
            () => props.label,
            () => {
                tabsContainer.updateLabels();
            }
        );

        return {
            props,
            tabsContainer
        }
    }
}
</script>

<style>
.k-pane-content {
    position: absolute;
    top: 50px;
    width: 100%;
}
</style>