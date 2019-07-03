module.exports = {
    css: {
      loaderOptions: {
        less: {
          modifyVars: {
            'primary-color': '#052763',
            'item-hover-bg': '#ddd',
            'border-radius-base': '2px',
            'input-hover-border-color': '#0d499e'
          },
          javascriptEnabled: true
        }
      }
    },
    devServer: {
      proxy: {
        '/api': {
            target: `http://www.lemonpai.cn`,
            pathRewrite: {'^/api': '/api'},
            changeOrigin: true,
        },
      }
    }
}