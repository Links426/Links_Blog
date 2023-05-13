import { getAllEpisode } from '@/utils/episode'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('@/views/index/index.vue'),

        meta: { label: '主页' },
        children: [],
    },
]
onMounted(() => {
    for (const { id } of getAllEpisode()) {
        routes.push({
            name: `Episode/${id}`,
            path: `/episode/${id}`,
            component: () =>
                import('@/components/episode-content.vue').then(
                    ({ default: EpisodeContent }) => {
                        return h(EpisodeContent, { id })
                    }
                ),
        })
    }
})
export default routes
