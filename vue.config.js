const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '': {
                target: 'http://139.196.106.190:8080',
                ws: false
            }
        }
    }
});