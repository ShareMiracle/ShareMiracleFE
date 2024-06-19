<template>
    <nav>
        <div class="nav-item">
            <nav-menu></nav-menu>
        </div>

        <div class="nav-item">
            <nav-search></nav-search>
            <nav-user></nav-user>
            <el-divider direction="vertical" />
            <nav-language></nav-language>
        </div>
    </nav>
</template>

<script setup lang="ts">

import navMenu from './menu.vue';
import navSearch from './search.vue';
import navUser from './user/index.vue';
import navLanguage from './language.vue';

</script>

<style>
.nav-item {
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    height: fit-content;
    align-items: center;
}


nav {
    padding: 12px 20px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--nav-layer);
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    background: white;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
    width: 98.5%;
    transition: .3s ease;
    -webkit-transition: .3s ease;
    -ms-transition: .3s ease;
}

nav a {
    color: black;
    font-size: .9rem;
    text-decoration: none;
    border-radius: .6em;
    cursor: pointer;
    padding: var(--nav-block-padding);
}

nav a:hover {
    color: white;
    background-color: var(--main-fill-color);
    transition: var(--animation-3s);
}

nav a.router-link-exact-active {
    color: white;
    background-color: var(--main-fill-color);
    transition: var(--animation-3s);
}

nav .spliter {
    height: 20px;
    width: 1px;
    background-color: #7e8081;
    margin-left: 5px;
    margin-right: 5px;
}

</style>