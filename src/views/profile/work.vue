<template>
    <div class="profile-content">
        <k-tabs>
            <k-pane
                :label="t('profile.dataset')"
            >
            <div class="profile-pane">
                <icon-placeholder
                    color="gray"
                    icon-name="empty"
                    :description="t('mdata.search.no-history')"
                    :image-size="100"
                ></icon-placeholder>
            </div>
            </k-pane>
            <k-pane
                :label="t('profile.model')"
            >
            <div class="profile-pane">
                <icon-placeholder
                    color="gray"
                    icon-name="empty"
                    :description="t('mdata.search.no-history')"
                    :image-size="100"
                ></icon-placeholder>
            </div>
            </k-pane>
            <k-pane
                :label="t('profile.task')"
            >
            <div class="profile-pane">
                <icon-placeholder
                    color="gray"
                    icon-name="empty"
                    :description="t('mdata.search.no-history')"
                    :image-size="100"
                ></icon-placeholder>
            </div>
            </k-pane>
        </k-tabs>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

import IconPlaceholder from '@/components/Writing/IconPlaceholder.vue';
import KPane from '@/components/Writing/KPane.vue';
import KTabs from '@/components/Writing/KTabs.vue';

const { t } = useI18n();

defineComponent({
    name: 'profile-work'
});

onMounted(async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>

<style>
.profile-content {
    border-radius: 1.0em;
    border: 2px solid var(--transplant-main-color-3);
    overflow: hidden;
    min-height: 50vh;
}

.profile-pane {
    padding-top: 60px;
}

</style>