const path = require('path');

module.exports = {
    entry: './scripts/index.ts',
    output: {
        filename: "index.js",
        path: path.resolve(__dirname)
    },
    watch: true,
    mode: "development",
    devtool: "source-map",
    resolve: {
        extensions: [".webpack.js", ".web.ts", ".ts", ".tsx", ".js"]
    },
    module: {
        // rules: [
        //     { 
        //         test: /\.m?js$/,
        //         use: {
        //             loader: 'babel-loader',
        //             options: {
        //                 presets: ['@babel/preset-env'],
        //                 plugins: ['@babel/plugin-proposal-class-properties']
        //             }
        //         }
        //     }
        // ]
        rules: [
            {
                test: /\.tsx?$/, loader: "ts-loader"
            },
            {
                test: /\.js$/, loader: "source-map-loader",
            }
        ]
    }

}