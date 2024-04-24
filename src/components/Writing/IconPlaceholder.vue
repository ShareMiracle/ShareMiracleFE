<template>
    <div class="image-ph-container">
        <span
            :class="`iconfont icon-${props.iconName}`"
            :style="imageStyle"
        ></span>
        <div class="image-ph-description" v-if="props.description">
            <span>{{ props.description }}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, defineProps, defineComponent } from 'vue';

defineComponent({ name: 'icon-placeholder' });
const props = defineProps({
    color: {
        type: String,
        default: '#801EFF'
    },
    iconName: {
        type: String,
        default: 'image'
    },
    description: {
        type: String,
        default: ''
    },
    imageSize: {
        type: Number,
        default: 200
    }
});

const imageStyle = computed(() => ({
    fontSize: `${props.imageSize}px`,
    color: props.color
}));
</script>

<style>
.image-ph-container {
    margin-top: -20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    border-radius: 1em;
}

.image-ph-container .iconfont {
    color: #DCDDE0;
}

.image-ph-description {
    margin-top: -40px;
    width: 100%;
    text-align: center;
    font-size: 16px;
}

</style>