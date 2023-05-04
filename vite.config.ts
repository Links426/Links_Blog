import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { presetUno, presetAttributify } from 'unocss'
import path from 'path'
const resolve = (dir) => path.resolve(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
    base: './', //打包路径
    plugins: [
        vue(),
        Unocss({
            presets: [presetUno(), presetAttributify()],
            shortcuts: [
                ['flex-center', 'flex items-center justify-center'],
                ['rounded', 'rounded-50%'],
            ],
        }),
        Components({
            resolvers: [
                ArcoResolver({
                    sideEffect: true,
                }),
            ],
        }),
        AutoImport({
            resolvers: [ArcoResolver()],
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],

            // global imports to register
            imports: [
                // 插件预设支持导入的api
                'vue',
                'vue-router',
                'pinia',
                // 自定义导入的api
            ],
            dts: './auto-imports.d.ts',
        }),
    ],
    resolve: {
        alias: {
            '@': resolve('src'),
        }, // 导入时想要省略的扩展名列表
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
})
