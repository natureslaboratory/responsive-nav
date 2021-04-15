const path = require('path');

module.exports = {
    entry: './scripts/index.js',
    output: {
        filename: "index.js",
        path: path.resolve(__dirname)
    },
    watch: true,
    mode: "production",
    module: {
        rules: [
            { 
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    }
}