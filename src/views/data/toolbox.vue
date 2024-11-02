<template>
    <div class="toolbox-container">
        <div class="top-input">
            <el-input></el-input>
        </div>
        <hr>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

defineComponent({
    name: 'toolbox'
});



</script>

<style>
.toolbox-container {
    width: 95%;
}

.top-input {
    width: 60%;
}

</style>