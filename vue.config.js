module.exports = {
    css: {
      loaderOptions: {
        less: {
          modifyVars: {
            'primary-color': '#052763',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
            'slider-handle-color-focus': '#fff',
            'slider-handle-color-focus-shadow': '#fff',
          },
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