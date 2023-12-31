const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer: {
    // 本地配置
    proxy: {
      '/api': {
        target: "https://localhost:8088",//实际访问的ip
        changeOrigin: true,
        pathRewrite: {
          '^/api': "" //实际访问的ip
        }
      },
    }
  }
})
