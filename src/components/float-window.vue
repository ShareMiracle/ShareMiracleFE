<!-- Component Definition -->
<template>
    <button :class="props.buttonClass">
        <div :class="props.headerClass" 
            @mouseover="contentController.show" 
            @mouseleave="contentController.hide"
        >
            <slot name="header"></slot>
        </div>
        <Transition :name="props.animation">
            <div v-show="!contentController.hidden" 
                @mouseover="contentController.show"
                @mouseleave="contentController.hide"
            >
                <div 
                    :class="props.contentClass" 
                    style="position: absolute;" 
                >
                    <slot name="content"></slot>
                </div>
            </div>
        </Transition>
    </button>
</template>

<script setup lang="ts">
import { defineProps, reactive } from 'vue';

const props = defineProps({
    buttonClass: {
        type: String,
        default: 'float-window-button'
    },
    headerClass: {
        type: String,
        default: 'float-window-header'
    },
    contentClass: {
        type: String,
        default: 'float-window-content'
    },
    hiddenDelay: {
        type: Number,
        default: 300 
    },
    animation: {
        type: String,
        default: 'main-fade'
    }
});

// acquire handle of elements

const contentController = reactive({
    hidden: true,
    hideTimerID: -1,
    show() {
        this.hidden = false;
        if (this.hideTimerID != -1) {
            clearInterval(this.hideTimerID);
            this.hideTimerID = -1;
            console.log(props.contentClass);
            
        }
    },
    hide() {
        this.hideTimerID = setTimeout(() => {
            this.hidden = true;
        }, props.hiddenDelay);
    }
});

</script>

<!-- style -->
<style>
:root {
    --animation-during: .5s;
}

/* 虽然名字很奇怪，但是这个类代表最外层的那家伙 */
.float-window-button {
    height: fit-content;
    width: fit-content;
    font-size: 16px;
}

/* 一般情况下，我们认为 content 依附于 header */
.float-window-header {
    position: relative;
}

.float-window-content {
    position: absolute;
    bottom: -20px;
    padding: 10px;
    border-radius: .9em;
}
</style>