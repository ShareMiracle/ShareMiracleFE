<template>
    <div class="data-wrapper">
        <div class="data-body-wrapper">
            <data-left></data-left>
            <data-right></data-right>
        </div>
    </div>
</template>

<script setup lang="ts">

import dataLeft from './left.vue';
import dataRight from './right.vue';


        
</script>

<style>
.data-wrapper {
    width: 80%;
}


.data-body-wrapper {
    display: flex;
    min-height: 2000px;
}

</style>