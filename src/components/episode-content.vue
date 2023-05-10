<template>
    <div>
        <div class="episode-header">
            <div>Links</div>
            <div>{{ episodeContent?.title }}</div>
        </div>
        <div v-if="episodeContent" mx-auto max-w-72.917vw py-104px mb-100px>
            <a-row flex>
                <a-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19" :xxl="19">
                    <component :is="episodeContent!.default" />
                </a-col>
                <a-col
                    :lg="5"
                    :xl="5"
                    :xxl="5"
                    fixed
                    right-50px
                    top-90px
                    v-show="fullWidth >= 992"
                >
                    <a-card :title="'目录'">
                        <div
                            class="menuItem"
                            :class="
                                currentMenuItemSel == item.id
                                    ? 'menuItemSel'
                                    : ''
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
    window.removeEventListener('scroll', onScroll)
})
onMounted(() => {
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', onScroll)
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
    window.removeEventListener('scroll', onScroll)
    currentMenuItemSel.value = num
    document.querySelector(`#${id}`)?.scrollIntoView({
        behavior: 'smooth', // 平滑过渡
        block: 'center', // 上边框与视窗顶部平齐
    })
    window.addEventListener('scroll', onScroll)
}
const currentMenuItemSel = ref(0)

const onScroll = () => {
    const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop

    for (let i = 0; i < menuItemList.value.length; i++) {
        if (menuItemList.value[i].offsetTop > scrollTop) {
            currentMenuItemSel.value = i
            break
        }
    }
}
</script>

<style scoped>
.menuItem {
    cursor: pointer;
    padding: 12px;
    margin-bottom: 8px;
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

.episode-header {
    height: 52px;
    width: 100%;
    padding: 0 24px;
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.04);
    background-image: radial-gradient(transparent 1px, #fff 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
}
</style>
