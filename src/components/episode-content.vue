<template>
    <div>
        <div class="episode-header">
            <div>Links</div>
            <div>{{ episodeContent?.frontmatter.title }}</div>
        </div>
        <div v-if="episodeContent" mx-auto max-w-72.917vw py-104px mb-100px>
            <a-row flex>
                <a-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19" :xxl="19">
                    <component :is="episodeContent!.default" v-highlight />
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
                    <a-card :title="'目录'" max-h-600px overflow-auto>
                        <div
                            class="menuItem"
                            :class="
                                currentMenuItemSel == item.id
                                    ? 'menuItemSel'
                                    : ''
                            "
                            :style="{
                                paddingLeft:
                                    8 * Number(item.type.slice(1)) - 16 + 'px',
                            }"
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
let timer: string | number | NodeJS.Timeout | undefined
const toPagePlace = (id: string, num: number) => {
    clearTimeout(timer)
    window.removeEventListener('scroll', onScroll)
    currentMenuItemSel.value = num
    document.querySelector(`#${id}`)?.scrollIntoView({
        behavior: 'smooth', // 平滑过渡
        block: 'center', // 上边框与视窗顶部平齐
    })
    timer = setTimeout(() => {
        window.addEventListener('scroll', onScroll)
    }, 2000)
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
@media (prefers-color-scheme: dark) {
    .markdown-body {
        color-scheme: light;
        --color-prettylights-syntax-comment: #6e7781;
        --color-prettylights-syntax-constant: #0550ae;
        --color-prettylights-syntax-entity: #8250df;
        --color-prettylights-syntax-storage-modifier-import: #24292f;
        --color-prettylights-syntax-entity-tag: #116329;
        --color-prettylights-syntax-keyword: #cf222e;
        --color-prettylights-syntax-string: #0a3069;
        --color-prettylights-syntax-variable: #953800;
        --color-prettylights-syntax-brackethighlighter-unmatched: #82071e;
        --color-prettylights-syntax-invalid-illegal-text: #f6f8fa;
        --color-prettylights-syntax-invalid-illegal-bg: #82071e;
        --color-prettylights-syntax-carriage-return-text: #f6f8fa;
        --color-prettylights-syntax-carriage-return-bg: #cf222e;
        --color-prettylights-syntax-string-regexp: #116329;
        --color-prettylights-syntax-markup-list: #3b2300;
        --color-prettylights-syntax-markup-heading: #0550ae;
        --color-prettylights-syntax-markup-italic: #24292f;
        --color-prettylights-syntax-markup-bold: #24292f;
        --color-prettylights-syntax-markup-deleted-text: #82071e;
        --color-prettylights-syntax-markup-deleted-bg: #ffebe9;
        --color-prettylights-syntax-markup-inserted-text: #116329;
        --color-prettylights-syntax-markup-inserted-bg: #dafbe1;
        --color-prettylights-syntax-markup-changed-text: #953800;
        --color-prettylights-syntax-markup-changed-bg: #ffd8b5;
        --color-prettylights-syntax-markup-ignored-text: #eaeef2;
        --color-prettylights-syntax-markup-ignored-bg: #0550ae;
        --color-prettylights-syntax-meta-diff-range: #8250df;
        --color-prettylights-syntax-brackethighlighter-angle: #57606a;
        --color-prettylights-syntax-sublimelinter-gutter-mark: #8c959f;
        --color-prettylights-syntax-constant-other-reference-link: #0a3069;
        --color-fg-default: #24292f;
        --color-fg-muted: #57606a;
        --color-fg-subtle: #6e7781;
        --color-canvas-default: #ffffff;
        --color-canvas-subtle: #f6f8fa;
        --color-border-default: #d0d7de;
        --color-border-muted: hsla(210, 18%, 87%, 1);
        --color-neutral-muted: rgba(175, 184, 193, 0.2);
        --color-accent-fg: #0969da;
        --color-accent-emphasis: #0969da;
        --color-attention-subtle: #fff8c5;
        --color-danger-fg: #cf222e;
    }
}
.menuItem {
    cursor: pointer;
    padding: 8px;
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
    z-index: 99;
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.04);
    background-image: radial-gradient(transparent 1px, #fff 1px);
    background-size: 4px 4px;
    backdrop-filter: saturate(50%) blur(4px);
}
</style>
