<template>
    <div class="search-box-container"
        :class="{'focus': recommendBox.show}"
        tabindex="0" outline="0"
        @focus="searchBox.acquireFocus()"
        @blur="searchBox.leaveFocus()"
    >
        <div class="search-type-container"
            @click="searchType.showTypeList = !searchType.showTypeList"
        >
            <div
                class="current-search-type"
                :class="{'focus': searchType.showTypeList}">
                <span :class="searchBox.currentSearchTypeIcon()"/>
            </div>
            <div class="current-search-type-arrow"
                :class="{'focus': searchType.showTypeList}">
                <span class="iconfont icon-arrow-down"
                ></span>
            </div>
            <transition name="collapse-from-top" mode="out-in">
                <div
                    v-show="searchType.showTypeList"
                    class="search-type-popover"
                    @click="searchType.showTypeList = !searchType.showTypeList"
                    @mouseenter="searchType.showTypeListFn()"
                >
                    <div class="item"
                        v-for="(item, index) of searchType.searchTypes"
                        :key="index"
                        @click.stop="searchType.currentSearchTypeIndex = index"
                        :class="{'focus': searchType.currentSearchTypeIndex === index}"
                    >
                        <div :class="item.icon">&ensp;{{ item.name }}</div>
                        <span></span>
                    </div>
                </div>
            </transition>
        </div>
        <span class="search-spliter"></span>
        <div class="search-input-container">
            <input
                @focus="searchBox.acquireFocus()"
                @blur="searchBox.leaveFocus()"
                ref="searchInput"
                v-model="searchBox.searchContent"
                type="text"
                class="search-box"
                @keydown.enter="searchBox.search()"
            />
            <div class="search-box-icon">
                <span
                    class="iconfont icon-search"
                    :class="{'focus': recommendBox.show}"
                    @click.stop="searchBox.search()"
                ></span>
            </div>
            <transition name="collapse-from-top" mode="out-in">
                <div
                    v-show="recommendBox.show"    
                    class="search-recommend-container">
                    <div class="history-recommend">
                        <div class="recommend-title">
                            <span class="iconfont icon-history"></span>
                            &ensp; 历史搜索</div>
                        <div v-if="recommendBox.historyItems.length === 0">
                            <icon-placeholder
                                color="gray"
                                icon-name="empty"
                                description="暂时没有搜索记录"
                                :image-size="100"
                            ></icon-placeholder>
                        </div>
                        <div v-else>
                            <div class="recommend-content-wrapper">
                                <div v-for="(item, index) of recommendBox.historyItems"
                                    :key="index"
                                    class="recommend-item"
                                    @click="searchBox.search(item)"
                                >{{ item }}</div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="common-use-recommend">
                        <div class="recommend-title">
                            <span class="iconfont icon-tag"></span>
                            &ensp;标签搜索</div>
                        <div class="recommend-content-wrapper">
                            <div v-for="(topic, index) of recommendBox.topics"
                                :key="index"
                                class="recommend-item"
                                @click="recommendBox.searchByTag(topic)"
                            >{{ topic }}</div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>

    </div>
</template>

<script setup>
import { reactive, onMounted, nextTick, ref } from 'vue';
import { useRouter } from 'vue-router';
import { showInfoWindow } from '@/hook/window';
import { globalSearchFn } from '@/hook/global';
import { reqGetAllTopics } from '@/api/user';
import { globalRequestResult } from '@/hook/global';
import { getRandomElements } from '@/hook/utils';

import IconPlaceholder from './Writing/IconPlaceholder.vue';

const router = useRouter();
const searchInput = ref(null);

const searchType = reactive({
    showTypeList: false,
    currentSearchTypeIndex: 0,
    hideTimer: undefined,
    searchTypes: [
        {
            name: '博客',
            icon: 'iconfont icon-blog'
        },
        {
            name: '音乐',
            icon: 'iconfont icon-guitar'
        }
    ],
    showTypeListFn() {
        if (this.hideTimer !== undefined) {
            clearTimeout(this.hideTimer);
        }
        this.showTypeList = true;
    },
    hideTypeListFn() {
        this.hideTimer = setTimeout(() => {
            this.showTypeList = false;
        }, 1000);
    }
})

const searchBox = reactive({
    searchContent: '',
    search(word) {
        if (word) {
            this.searchContent = word;
        }
        const index = searchType.currentSearchTypeIndex;
        const item = searchType.searchTypes[index];

        this.searchContent = this.searchContent.trim();
        const content = this.searchContent;
        if (content.length === 0) {
            showInfoWindow("输入不能为空！");
            return;
        }

        if (!recommendBox.historyItems.includes(content)) {
            recommendBox.historyItems.push(content);
            if (recommendBox.historyItems.length > 15) {
                recommendBox.historyItems = recommendBox.historyItems.slice(1);
            }
            nextTick(() => {
                const jsonString = JSON.stringify(recommendBox.historyItems);
                localStorage.setItem('search.history', jsonString);
            });
        }

        switch (item.name) {
            case '博客':
                this.searchBlog();
                break;
            case '音乐':
                this.searchStaff();
                break;
            default:
                break;
        }
    },
    searchBlog() {
        if (router.currentRoute.value.path === '/blog/search') {
            globalSearchFn.blog && globalSearchFn.blog(this.searchContent);
        } else {
            router.push({
                path: "/blog/search",
                query: { q: this.searchContent },
            });
        }

    },
    searchStaff() {
        router.push({
            path: "/blog/search",
            query: { q: this.searchContent },
        });
    },
    currentSearchTypeIcon() {
        const index = searchType.currentSearchTypeIndex;
        const item = searchType.searchTypes[index];
        return item.icon;
    },
    acquireFocus() {
        recommendBox.show = true;
    },
    leaveFocus() {
        recommendBox.show = false;
    }
});

const recommendBox = reactive({
    show: false,
    historyItems: [],
    topics: [],
    searchByTag(topicName) {
        if (globalSearchFn.blogTopics !== undefined) {
            globalSearchFn.blogTopics(topicName);
        } else {
            router.push({
                path: "/blog/topicsearch",
                query: { topicName },
            });
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
        searchInput.value.blur();
        recommendBox.show = false;
    }
});

async function getAllCachedTopics() {
    if (globalRequestResult.getAllTopics !== undefined) {
        return globalRequestResult.getAllTopics;
    } else {
        const res = await reqGetAllTopics();
        if (res.code === 200) {
            globalRequestResult.getAllTopics = res.data;
            return res.data;
        }
    }
}

// 搜集历史搜索信息
onMounted(async () => {
    const topicsP = getAllCachedTopics();
    const jsonString = localStorage.getItem('search.history');
    if (jsonString) {
        recommendBox.historyItems = JSON.parse(jsonString);
    }
    // 随机挑选15个
    const topics = await topicsP;
    if (topics && topics.length > 0) {
        recommendBox.topics = getRandomElements(topics, 15);
    } else {
        recommendBox.topics = ['nginx', 'torch', 'vue', '语音合成', 'webgl'];
    }
});

</script>

<style>
.search-box-container {
    padding: 0 10px;
    margin-right: 10px;
    position: relative;
    width: 360px;
    border: 2px var(--main-color);
    border-radius: .9em;
    border-color: var(--main-color);
    box-shadow: 0 0 0 1px var(--main-color);
    display: flex;
    align-items: center;
    background-color: rgba(204, 205, 207, 0.3);
    transition: var(--animation-3s);
}

.search-box-container:hover {
    background-color: rgba(242,243,244, 0.3);
    transition: var(--animation-3s);
}

.search-box-container.focus {
    font-family: var(--base-font);
    width: 540px !important;
    border: none;
    border-radius: .9em;
    transition: var(--animation-3s);
}

.search-box {
    font-family: var(--base-font);   
    background: transparent !important;
    border: none !important;
    caret-color: var(--main-color);
}

.search-box:focus {
    border: none !important;
    box-shadow: unset !important;
}

.search-type-container {
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
}

.current-search-type {
    font-size: 1.1rem;
    padding-right: 3px;
    transition: var(--animation-3s);
}

.current-search-type.focus {
    color: var(--main-color);
    transition: var(--animation-3s);
}

.current-search-type-arrow {
    transform: rotate(180deg);
    transition: var(--animation-3s);
}

.current-search-type-arrow.focus {
    transform: rotate(0deg);
    transition: var(--animation-3s);
}

.search-input-container {
    position: relative;
    width: 100%;
}

.search-box-icon {
    position: absolute;
    font-size: 1.2rem;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
}

span.iconfont.icon-search {
    transition: var(--animation-5s);
    border-radius: .5em;
    padding: 2px 10px;
    height: fit-content;
    cursor: pointer;
}

span.iconfont.icon-search.focus {
    background-color: var(--main-color);
    color: white;
    border-radius: 1.2em;
    transition: var(--animation-5s);
}

.search-type-popover {
    position: absolute;
    top: 60px;
    padding: 10px;
    left: -35px;
    border-radius: .5em;
    width: 130px;
    background: rgba(247, 242, 254, 0.6);
    backdrop-filter: blur(5px);
    box-shadow: 0 0 8px 3px rgba(181, 181, 182, 0.9);
    z-index: 12;
}

.search-type-popover .item {
    padding: 5px 7px;
    border-radius: .5em;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 95%;
    font-family: var(--base-font);
    font-size: 15px;
    cursor: pointer;
}

.search-type-popover .item:hover {
    background-color: var(--transplant-main-color-2);
    color: var(--shadow-color);
}

.search-type-popover .item.focus {
    background-color: rgb(228, 208, 255);
    color: var(--main-color);
}

.search-spliter {
    height: 20px;
    width: 1px;
    background-color: #7e8081;
}

.search-box-container .recommend-content {
    position: absolute;
    top: 20px;
}

.search-recommend-container {
    position: absolute;
    top: 70px;
    left: -30px;
    width: calc(100% + 30px);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    border: 1.2px solid var(--main-color);
    box-shadow: 0 0 8px 3px rgba(182, 181, 182, 0.9);
    padding: 20px;
    border-radius: .5em;
}

.recommend-title {
    font-size: 16px;
    color: black;
    font-weight: 600;
    margin-bottom: 10px;
}

.recommend-item {
    display: block;
    font-size: 15px;
    font-family: var(--base-font);
    margin: 5px;
    padding: 3px 7px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: white;
    background-color: var(--transplant-main-color-1);
    border-radius: .9em;
    cursor: pointer;
}

.recommend-content-wrapper {
    display: flex;
    flex-flow: wrap;
}

</style>