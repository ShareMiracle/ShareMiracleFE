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
                            <span class="title">
                                {{ dataset.name }}
                            </span>
                            <span class="dataset-status">
                                {{ t('info.data.dataset-status.text') }}
                            </span>
                        </div>
                        <div class="dataset-description">
                            {{ dataset.description || t('info.data.description.text') }}
                        </div>
                        <hr>
                        <div class="dataset-datelink">
                            <span class="dataset-date">
                                <span class="iconfont icon-date"></span>
                                {{ dataset.release_date || t('info.data.datalink.unknown') }}
                            </span>
                            &emsp;
                            <span class="dataset-link" @click="gotoUrl(dataset.origin_url)">
                                <span class="iconfont icon-link"></span>
                                {{ dataset.origin_url || t('info.data.datalink.no-url') }}
                            </span>
                        </div>
                    </div>
                    <div class="data-item-tool">
                        <div></div>
                        <div class="right-display">
                            <div class="join-project">
                                <span class="iconfont icon-three-join"></span>
                                {{ t('info.data.join-project.text') }}
                            </div>
                            <div>
                                <!-- 下载时序缩略图 -->
                            </div>
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
                    :page-count="searchResults.page_num"
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
import { useI18n } from 'vue-i18n';
import Toolbox from './toolbox.vue';


const { t } = useI18n();

defineComponent({
    name: 'data-right'
});

async function currentPageChange(page_id: number) {
    searchManagement.page_id = page_id - 1;
    await search();
    window.scrollTo({ top: 0, behavior: "smooth" });
}


onMounted(async () => {
    searchManagement.page_id = 0;
    await search();
    loading.value = false;
});

function gotoUrl(url: string | undefined) {
    if (typeof url === 'string' && url.startsWith('http')) {
        window.open(url);
    }
}


</script>

<style>

.data-right {
    width: 95%;
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
    width: 95%;
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
    width: 60%;
}

.search-pagination {
    margin-top: 50px;
}

.dataset-title {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
}

.dataset-title .title {
    font-weight: 600;
    color: var(--main-color);
    margin-top: 3px;
    margin-bottom: 3px;
    font-size: 1.2rem;
}

.dataset-title .dataset-status {
    margin-left: 5px;
    font-size: 0.85rem;
    padding: 1px 4px;
    border-radius: 1.2em;
    color: white;
    background-color: var(--main-color);
}

.dataset-description {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 550px;
    color: var(--transplant-main-color-1);
}

.dataset-datelink {
    margin-top: 5px;
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

.data-item-tool {
    width: 40%;
    display: flex;
    justify-content: space-between;
}

.data-item-tool .right-display {
    padding: 10px;
    display: flex;
    flex-direction: column;
}

.data-item-tool .join-project {
    font-size: 1.0rem;
    padding: 5px;
    border-radius: .8em;
    border: 1px solid var(--main-color);
}

.data-item-tool .join-project .iconfont {
    font-size: 1.0rem;
    font-weight: 600;
}

</style>