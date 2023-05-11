import { createApp } from 'vue'
import { setupStore } from '@/stores/store'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import router from '@/router'
import App from './App.vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/panda-syntax-light.css'

import 'highlight.js/lib/common'

import 'uno.css'

import 'github-markdown-css'
import '@arco-design/web-vue/dist/arco.css'
import '@/assets/css/reset.css'
import 'normalize.css'
import '@/assets/font/iconfont.css'

const app = createApp(App)

app.use(router)
app.use(ArcoVue)
app.use(ArcoVueIcon)
setupStore(app)
app.mount('#app')
app.directive('highlight', (el) => {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block: any) => {
        hljs.highlightBlock(block)
    })
})
