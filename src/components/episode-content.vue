<template>
    <div
        h-40px
        mb-24px
        flex
        justify-center
        justify-between
        items-center
        font-bold
        px-24px
    >
        <div>Links</div>
        <div>{{ episodeContent?.title }}</div>
    </div>
    <div v-if="episodeContent" mx-auto max-w-72.917vw>
        <a-row flex :gutter="12">
            <a-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19" :xxl="19">
                <component :is="episodeContent!.default" />
            </a-col>
            <a-col
                :lg="5"
                :xl="5"
                :xxl="5"
                fixed
                right-3.646vw
                top-7.292vw
                v-show="fullWidth >= 992"
            >
                <a-card :title="'目录'">
                    <div
                        class="menuItem"
                        :class="
                            currentMenuItemSel == item.id ? 'menuItemSel' : ''
                        "
                        v-for="item in menuItemList"
                        @click="toPagePlace(item.point, item.id)"
                    >
                        {{ item.txt }}
                    </div>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { getAllEpisode } from '../utils/episode'

const { id } = defineProps<{ id: string }>()

const episodes = getAllEpisode()

const episodeContent = computed(() =>
    episodes.find((episode) => id === episode.id)
)

const fullWidth = ref(document.body.clientWidth)
const showMenu = ref(true)
const handleResize = (event: any) => {
    fullWidth.value =
        document.documentElement.clientWidth ||
        document.body.clientWidth ||
        window.innerWidth
    if (fullWidth.value < 1000) {
        showMenu.value = false
    } else {
        showMenu.value = true
    }
}
const menuItemList = ref<
    {
        id: number
        type: string
        txt: string
        offsetTop: number
        point: string
    }[]
>([])
onBeforeMount(() => {
    window.removeEventListener('resize', handleResize)
})
onMounted(() => {
    window.addEventListener('resize', handleResize)
    getFullMenu()
})
const getFullMenu = () => {
    const dom = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    dom.forEach((item: any, key: number) => {
        menuItemList.value.push({
            id: key,
            type: item.nodeName,
            txt: item.innerText,
            offsetTop: item.offsetTop,
            point: `target_${key}`,
        })
        item.setAttribute('id', `target_${key}`)
    })
}
const toPagePlace = (id: string, num: number) => {
    currentMenuItemSel.value = num
    document.querySelector(`#${id}`)?.scrollIntoView({
        behavior: 'smooth', // 平滑过渡
        block: 'center', // 上边框与视窗顶部平齐
    })
}
const currentMenuItemSel = ref(0)
</script>

<style scoped>
.menuItem {
    cursor: pointer;
    padding: 0.625vw;
    margin-bottom: 0.417vw;
    transition: all 0.3s;
}
.menuItemSel {
    color: #007fff;
}
.menuItem:hover {
    background-color: #f7f8fa;
    transition: all 0.3s;
    border-radius: 0.208vw;
}
.menuCollapse {
    display: none;
}
</style>
