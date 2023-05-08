<template>
    <router-view v-slot="{ Component }">
        <Transition>
            <component :is="Component" />
        </Transition>
    </router-view>
</template>

<style scoped>
.v-enter-active {
    transition: opacity 0.3s ease-in;
}
.v-enter-from {
    opacity: 0;
}
</style>
