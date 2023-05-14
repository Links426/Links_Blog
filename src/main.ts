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
    // 获取页面中的所有 <pre> 元素
    var pres = document.getElementsByTagName('pre')

    var tags = ['div', 'p', 'span', 'h1', 'h2', 'h3', 'h4']

    for (var i = 0; i < pres.length; i++) {
        var codes = pres[i].getElementsByTagName('code')
        for (var j = 0; j < codes.length; j++) {
            var text = codes[j].textContent

            for (var k = 0; k < tags.length; k++) {
                var tag = tags[k]

                var regex = new RegExp('<?' + tag + '/>', 'g')
                text = text!.replace(regex, function (match) {
                    return '&lt;' + match.slice(1, -1) + '&gt;'
                })
            }
            codes[j].textContent = text
        }
    }
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block: any) => {
        hljs.highlightBlock(block)
    })
})
