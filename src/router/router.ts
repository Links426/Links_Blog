const routes = [
    {
        path: '/',
        component: () => import('@/views/index/index.vue'),

        meta: { label: '主页' },
        children: [
            {
                path: '/main',
                name: '工作台',
                component: () => import('@/views/main/main.vue'),
                meta: { label: '工作台', openKeys: ['0'], selectKeys: ['0_0'] },
            },
        ],
    },
]
export default routes
