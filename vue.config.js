module.exports = {
    css: {
      loaderOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    devServer: {
      proxy: {
        '/api': {
            target: `http://localhost:3000`,
            pathRewrite: {'^/api': ''},
            changeOrigin: true,
        },
      }
    }
}