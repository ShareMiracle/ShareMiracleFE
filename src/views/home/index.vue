<template>
    <div class="home">
        <h1 align="center">{{ t('welcome title') }}</h1>
        <div class="welcome-wrapper">
            <div class="welcome-description">
                {{ t('welcome content') }}
                <br>
                <br>
                contant : xxxxxxx <br>
                suggestion: xxxxxxx <br>
            </div>
            <img alt="logo" src="../../assets/image/miracle.png" class="logo-image"/>
        </div>
        <br>
        <hr>

        <h1>{{ t('data') }}</h1>

        <div class="display-block-wrapper">
            <div class="display-radius-block">

            </div>
            <div class="display-radius-block">

            </div>
            <div class="display-radius-block">
                
            </div>
        </div>

        <hr>

        <h1>{{ t('model') }}</h1>
        <div class="display-block-wrapper">
            <div class="display-radius-block">

            </div>
            <div class="display-radius-block">

            </div>
            <div class="display-radius-block">
                
            </div>
        </div>
        <hr>


    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


onMounted(async () => {

    document.title = 'ShareMiracle - ' + t('home');
    window.scrollTo({ top: 0, behavior: "smooth" });
});

</script>

<style>
.home {
    width: 80%;
}

.welcome-wrapper {
    display: flex;
    justify-content: space-around;
}

.welcome-description {
    margin: 10px;
}

.logo-image {
    width: 20% !important;
}

.display-block-wrapper {
    display: flex;
    justify-content: space-around;
}

.display-radius-block {
    margin: 10px;
    border-radius: .6em;
    border: 1px solid black;
    min-height: 200px;
    min-width: 300px;
}


</style>