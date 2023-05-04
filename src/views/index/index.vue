<template>
    <a-layout style="height: 100vh">
        <a-layout-header
            h-60px
            flex
            items-center
            px-24px
            justify-between
            class="header-shadow"
            ><div flex-center>
                <img src="@/assets/img/answer.png" w-20px h-28px mr-12px />
                <span>Mechanical Pro</span>
            </div>
            <div>
                <a-button @click="changeColor">换色黑</a-button>
                <a-button @click="changeColor1">换色亮</a-button>
            </div>
        </a-layout-header>
        <a-layout>
            <a-layout-sider
                breakpoint="lg"
                :width="220"
                collapsible
                :collapsed="collapsed"
                @collapse="onCollapse"
            >
                <div />
                <a-menu
                    :defaultOpenKeys="router.currentRoute.value.meta.openKeys"
                    :defaultSelectedKeys="
                        router.currentRoute.value.meta.selectKeys
                    "
                    @menu-item-click="To"
                >
                    <a-sub-menu key="0">
                        <template #icon><icon-apps></icon-apps></template>
                        <template #title>仪表台</template>
                        <a-menu-item key="0_0">工作台</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="1">
                        <template #icon><icon-apps></icon-apps></template>
                        <template #title>数据可视化</template>
                        <a-menu-item key="1_0">分析页</a-menu-item>
                        <a-menu-item key="1_1">多维数据分析</a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="2">
                        <template #icon><icon-apps></icon-apps></template>
                        <template #title>个人中心</template>
                        <a-menu-item key="2_0">用户信息</a-menu-item>
                        <a-menu-item key="2_1">用户设置</a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout-sider>
            <a-layout-content class="w-full p-20px content-bg">
                <a-breadcrumb :routes="routesList" mb-16px>
                    <template #item-render="{ route, paths }">
                        <a-link @click="toBrumbPage(paths)">{{
                            route.meta.label
                        }}</a-link>
                    </template>
                </a-breadcrumb>
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script setup lang="ts">
const router = useRouter()

const collapsed = ref(false)

const routesList: any = ref([])
const onCollapse = (val: boolean) => {
    collapsed.value = val
}

const To = (key: string) => {
    if (key === '0_0') {
        router.push('/main')
    } else if (key === '1_0') {
        router.push('/data/analyse')
    } else if (key === '2_0') {
        router.push('/personal/info')
    } else if (key === '2_1') {
        router.push('/personal/setting')
    }
}

const useKeys = ['path', 'meta']
onBeforeRouteUpdate((to: any) => {
    const newArr: any = []
    to.matched.forEach(
        (item: { [s: string]: unknown } | ArrayLike<unknown>) => {
            const list = Object.entries(item).filter(([key]) =>
                useKeys.includes(key)
            )
            const newItem = Object.fromEntries(list)
            newArr.push(newItem)
        }
    )
    routesList.value = newArr
})

const toBrumbPage = (paths: string | any[]) => {
    router.push('/' + paths[paths.length - 1])
}

onMounted(() => {
    const newArr: any = []
    router.currentRoute.value.matched.forEach((item) => {
        const list = Object.entries(item).filter(([key]) =>
            useKeys.includes(key)
        )
        const newItem = Object.fromEntries(list)
        newArr.push(newItem)
    })
    routesList.value = newArr
})

const changeColor = () => {
    document.body.setAttribute('arco-theme', 'dark')
}
const changeColor1 = () => {
    document.body.setAttribute('arco-theme', 'light')
}
</script>

<style scoped>
.header-shadow {
    z-index: 15;
    background-color: var(--color-bg-2);
    color: var(--color-neutral-10);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.content-bg {
    background-color: var(--color-neutral-1);
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
