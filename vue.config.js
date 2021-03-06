module.exports = {
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#1b1b1b',
                    'item-hover-bg': '#ddd',
                    'border-radius-base': '2px',
                    'input-hover-border-color': '#0d499e'
                },
                javascriptEnabled: true
            }
        },
        sourceMap: true
    },

    devServer: {
        proxy: {
            '/api': {
                target: `http://localhost:19005`,
                pathRewrite: { '^/api': '' },
                changeOrigin: true,
            },
        }
    },
    runtimeCompiler: true
}