import { defineConfig,loadEnv,ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve}from 'path'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'; // <script lang='ts' setup name='demo'>  该插件用来在setup语法糖中 定义组件名name

//将相对路径解析为绝对路径 路径转换函数
const pathResolve=(dir:string)=>{
  return resolve(__dirname,'.',dir)  //__dirname：用来动态获取当前文件模块所属目录的绝对路径  __filename：用来动态获取当前文件的绝对路径 reslove作用是拼接参数
}


// 别名
const alias: Record<string, string> = {
  '/@': pathResolve('./src/'),
  'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
};


// 配置
const viteConfig=defineConfig((mode:ConfigEnv)=>{
  const env=loadEnv(mode.mode,process.cwd());
  return{
    plugins:[vue(),vueSetupExtend()],//插件
    root:process.cwd(), //  项目根目录（index.html 文件所在的位置）
    resolve:{alias},  // 定义文件路径别名，当使用文件系统路径的别名时，请始终使用绝对路径，否则无法解析
    base:mode.command==='serve'?'./' :env.VITE_PUBLIC_PATH,  //开发或生产环境服务的公共基础路径
    optimizeDeps: {
      include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en', 'element-plus/lib/locale/lang/zh-tw'],
      //首次执行 vite 时，服务启动后会对 node_modules 模块和配置 optimizeDeps 的目标进行预构建  预构建的模块
    },

    // 开发代理模式
    server: {
      host: '0.0.0.0',
      port: 8888,
      // open: env.VITE_OPEN,
      hmr: true,
      proxy: {
        '/sua': {
          target: 'http://localhost:8080/sua',
          ws: true,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/gitee/, ''),
          rewrite: (path) => path.replace(/^\/sua/, ''),
        },
      },
    },

    // 打包配置
    build: {
      outDir: 'dist', // 指定输出路径（相对于 项目根目录)
      chunkSizeWarningLimit: 1500, // 规定触发警告的 chunk(文件块) 大小
      rollupOptions: { // 自定义底层的 Rollup 打包配置
        output: {
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          assetFileNames: `assets/[name].[hash].[ext]`,
          compact: true,
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            echarts: ['echarts'],
          },
        },
      },
    },
    css: { preprocessorOptions: { css: { charset: false } } },
    define: {
      __VUE_I18N_LEGACY_API__: JSON.stringify(false),
      __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
      __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
      __VERSION__: JSON.stringify(process.env.npm_package_version),
    }
  }
})
export default viteConfig;