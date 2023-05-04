<template>
    <router-view></router-view>
</template>
<script setup lang="ts">
import * as echarts from 'echarts'
provide('echarts', echarts)
</script>

<style scoped></style>
