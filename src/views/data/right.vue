<template>
    <div class="data-right">
        <el-main
            class="search-result-wrapper"
            v-loading="loading"
            element-loading-svg-view-box="-10, -10, 50, 50"
            :element-loading-svg="loadingSvg"
        >
            <div class="search-result-container">
                <div v-for="(dataset) in searchResults.datasets" :key="dataset.id"
                    class="search-result-item"
                >
                    <div class="data-status-icon">
                        <span class="iconfont icon-statistic"></span>
                    </div>
                    <div class="search-result-item-content">
                        <div class="dataset-title">
                            {{ dataset.name }}
                        </div>
                        <div class="dataset-description">
                            <span>{{ dataset.description || 'no description' }}</span>
                            &emsp;
                            <span>{{ dataset.release_date || 'unknown' }}</span>
                            &emsp;
                            <span>{{ dataset.origin_url || 'no url' }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-pagination">
                <el-pagination
                    large
                    background
                    layout="prev, pager, next"
                    :total="50"
                    class="mt-4"
                />
            </div>
        </el-main>
        <div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { search, searchResults } from '@/store/search';
import { loadingSvg } from '@/hook/utils/loading';



const loading = ref(true);

defineComponent({
    name: 'data-right'
});


onMounted(async () => {
   await search();
   loading.value = false;
});

</script>

<style>

.data-right {
    width: 70%;
}

.search-result-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: center;
}

.search-result-container {
    width: 90%;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.search-result-item {
    overflow: hidden;
    width: 600px;
    display: flex;
    margin: 8px;
    border-radius: .6em;
    border: 1.5px solid var(--main-color);
    transition: var(--animation-3s);
    cursor: pointer;
}

.data-status-icon {
    color: white;
    padding: 6px 6px;
    background-color: var(--main-color);
    display: flex;
    align-items: center;
    justify-content: center;
}

.search-result-item:hover {
    scale: 1.05;
    transition: var(--animation-3s);
}

.search-result-item-content {
    padding: 6px 10px;
}

.search-pagination {
    margin-top: 50px;
}

.dataset-title {
    font-size: 1.0rem;
}

.dataset-description {
    font-size: 0.9rem;
    color: var(--transplant-main-color-1);
}

</style>