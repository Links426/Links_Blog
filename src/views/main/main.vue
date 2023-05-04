<template>
    <a-card w-360px title="节点12状态">
        <template #extra>
            <a-link @click="test">刷新</a-link>
        </template>

        <div>状态: 待启动</div>
        <div>进程启动情况:</div>
    </a-card>
</template>
<script setup lang="ts">
import { check12Status } from '@/api/main'
import { answerStore } from '@/stores'
const useAnswerStore = answerStore()
const { loading } = storeToRefs(useAnswerStore)
const test = async () => {
    return await check12Status()
}
</script>

<style scoped></style>
