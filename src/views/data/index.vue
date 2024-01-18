<template>
    <div class="data-wrapper">
        <!-- <h1>数据界面</h1> -->
        <div class="data-body-wrapper">
            <div class="tags-wrapper">
                <div class="cv-task-section">
                    <div class="tag-name">
                        CT
                    </div>
                    <div class="task-tag-group">
                        <div v-for="(c, index) in tasks" :key="index" class="task-tag">
                            {{ c }}
                        </div>
                    </div>
                </div>
                <div class="cv-task-section">
                    <div>
                        X-rays
                    </div>
                    <div class="task-tag-group">
                        <div v-for="(c, index) in tasks" :key="index" class="task-tag">
                            {{ c }}
                        </div>
                    </div>
                </div>
                <div class="cv-task-section">
                    <div>
                        MRI & fMRI
                    </div>
                    <div class="task-tag-group">
                        <div v-for="(c, index) in tasks" :key="index" class="task-tag">
                            {{ c }}
                        </div>
                    </div>
                </div>
                <div class="cv-task-section">
                    <div>
                        EHR
                    </div>
                    <div class="task-tag-group">
                        <div v-for="(c, index) in tasks" :key="index" class="task-tag">
                            {{ c }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="display-wrapper">
                <div>
                    <div class="display-radius-block">

                    </div>
                    <div class="display-radius-block">

                    </div>
                    <div class="display-radius-block">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const tasks = ['Image Classification', 'Object Detection', 
                'Semantic Segmentation', 'Image Enhancement', 'OOD'];
</script>

<style>
.data-wrapper {
    width: 80%;
}

.cv-task-section {
    margin-bottom: 20px;
}

.data-body-wrapper {
    display: flex;
    justify-content: space-around;
    min-height: 2000px;
}

.tags-wrapper {
    width: 40%;
    border-right: solid rgb(188, 188, 188) 2px;
    min-height: 2000px;

}

.display-wrapper {
    width: 60% !important;
}

.task-tag {
    border-radius: .5em;
    border: 1px solid black;
    width: fit-content;
    padding: 3px;
    margin: 5px;
}

.task-tag-group {
    display: flex;
    word-wrap: break-word;
}

.display-radius-block {
    margin: 20px;
    border-radius: .6em;
    border: 1px solid black;
    min-height: 100px;
    min-width: 200px;
}
</style>