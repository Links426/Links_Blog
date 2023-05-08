<template>
    <div class="mx-auto max-w-1000px min-w-600px">
        <div px-48px my-20px flex justify-between items-center h-40px font-bold>
            <div>Links426</div>

            <div flex>
                <div
                    :class="option.id == selOption ? 'index-option-sel' : ''"
                    class="index-option-unSel"
                    v-for="option in optionList"
                    @click="changePage(option.id)"
                >
                    {{ option.value }}
                </div>
            </div>
        </div>
        <div class="index-bg">
            <!-- 顶部 -->

            <div class="w-40% pr-80px">
                <div mb-24px text-24px>Hello! I'm Links 🍃</div>
                <div class="mb-16px">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer aliquet, orci in bibendum luctus, turpis ante
                    pretium velit, eu rutrum augue erat ac eros. Cras ultricies
                    mattis convallis.
                </div>
                <div text-12px mb-32px>EXPLORE ME IN..</div>
                <div class="text-#282c34 flex">
                    <div
                        class="iconfont contactIcon"
                        :class="item.icon"
                        v-for="item in contactList"
                        @mouseenter="enter(item.id)"
                        @mouseleave="leave(item.id)"
                    >
                        <transition name="Fade">
                            <div
                                v-show="
                                    showContactDetail && contactSel === item.id
                                "
                                text-16px
                                pl-10px
                            >
                                {{ item.value }}
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="w-60%">
                <div mb-30px text-20px>Recent Posts</div>
                <div
                    v-for="item in RawEpisodes"
                    class="index-blog-card"
                    h-160px
                    flex
                    flex-col
                    justify-center
                >
                    <router-link :to="{ name: `Episode/${item.id}` }">
                        <div class="text-14px text-#777777 mb-18px">
                            {{ item.date }}
                        </div>
                        <div text-19px>{{ item.title }}</div></router-link
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getAllEpisode } from '@/utils/episode'

const RawEpisodes = getAllEpisode()
const selOption = ref(0)
const optionList = [
    { id: 0, value: 'Home' },
    { id: 1, value: 'Blog' },
]

const contactList = [
    {
        id: 0,
        icon: 'icon-github-fill',
        value: 'Links426',
        url: 'https://github.com/Links426',
    },
    {
        id: 1,
        icon: 'icon-microsoftoutlook',
        value: 'links426@outlook.com',
        url: '',
    },
]
const changePage = (id: number) => {
    selOption.value = id
}
const contactSel = ref(0)
const showContactDetail = ref(false)
const enter = (id: number) => {
    contactSel.value = id

    showContactDetail.value = true
}
const leave = (id: number) => {
    contactSel.value = id

    showContactDetail.value = false
}
</script>

<style scoped>
.index-bg {
    padding: 26px 48px 0;
    display: flex;
}

.index-option-unSel {
    cursor: pointer;
    color: #979797;
    font-weight: bold;
    margin-left: 48px;
    transition: all 0.4s;
}
.index-option-sel {
    color: black;
    transition: all 0.4s;
}
.index-blog-card {
    border-top: 1px solid #dfdfdf;
}
.contactIcon {
    padding: 12px;
    border-radius: 6px;
    font-size: 22px;
    margin-right: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    cursor: pointer;
}
.contactIcon:hover {
    color: white;
    transition: all 0.3s;
    background-color: #282c34;
}

.Fade-enter,
.Fade-leave-to {
    opacity: 0;
}
.Fade-enter-to,
.Fade-leave {
    opacity: 1;
}

.Fade-enter-active,
.Fade-leave-active {
    transition: all 0.3s;
}
a {
    text-decoration: none; /* 去除默认的下划线 */
    outline: none; /* 去除旧版浏览器的点击后的外虚线框 */
    color: #000; /* 去除默认的颜色和点击后变化的颜色 */
}
</style>
