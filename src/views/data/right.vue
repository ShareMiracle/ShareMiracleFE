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
                            {{ dataset.description || 'no description' }}
                        </div>
                        <div class="dataset-datelink">
                            <span class="dataset-date">
                                <span class="iconfont icon-date"></span>
                                {{ dataset.release_date || 'unknown' }}
                            </span>
                            &emsp;
                            <span class="dataset-link">
                                <span class="iconfont icon-link"></span>
                                {{ dataset.origin_url || 'no url' }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-pagination">
                <el-pagination
                    large
                    background
                    @current-change="currentPageChange"
                    layout="prev, pager, next"
                    :total="searchResults.page_num"
                />
            </div>
        </el-main>
        <div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { search, searchManagement, searchResults, loading } from '@/store/search';
import { loadingSvg } from '@/hook/utils/loading';


defineComponent({
    name: 'data-right'
});

async function currentPageChange(page_id: number) {
    searchManagement.page_id = page_id - 1;
    await search();
}


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
    font-size: 1.05rem;
}

.dataset-description {
    font-size: 0.9rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 550px;
    color: var(--transplant-main-color-1);
}

.dataset-datelink {
    font-size: 0.8rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 550px;
    color: var(--transplant-main-color-1);
}

.dataset-date {
    font-size: 0.8rem;
}

.dataset-link {
    font-size: 0.8rem;
    width: fit-content;
}

.dataset-link:hover {
    color: var(--main-color);
    text-decoration: underline;
    cursor: pointer;
}

.dataset-date .icon-date {
    font-size: 12px;
}

.dataset-link .icon-link {
    font-size: 12px;
}


</style>