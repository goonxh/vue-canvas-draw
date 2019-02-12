const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    devServer: {
        open: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        port: 3000,
        https: false,
        hotOnly: false,
        proxy: {
            '/api' :{
                target: 'http://localhost:8082',
                secure: false,
                changeOrigin: true,
            }
        },
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.css$|\.html$/,
                        // cache: true,
                        // asset: '[path].gz[query]',
                        algorithm: 'gzip',
                        threshold: 0,
                        minRatio: 0.8,
                        // 压缩完成后是否删除源文件,
                        deleteOriginalAssets: false,
                    }),
                ]
            }
        } else {
            // 为开发环境修改配置
        }
    },
    css: {
        loaderOptions: {
            sass: {
                test: /\.scss$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            postcss: {
                test: /\.css$/,
                use: ['style-loader', 'postcss-loader'],
            }
        }
    }
}