<template>
    <button :class="buttonClass">
        <slot class="float-window-header" name="header"></slot>
        <slot class="float-window-content" name="content"></slot>
    </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        buttonClass: String
    }
})

export default class FloatWindow extends Vue {
    buttonClass?: string
}

</script>

<style>

</style>