const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Вхідний файл
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        assetModuleFilename: 'assets/[name][ext][query]' // Налаштування шляху для ресурсів
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/, // Лоадер для зображень
                type: 'asset/resource', // Використовуємо новий синтаксис для Webpack 5
            },
        ],
    },
    devServer: {
        static: path.join(__dirname, 'dist'), // Вказуємо директорію для сервера
        port: 4000,
        open: true, // Автоматично відкривати браузер
        hot: true,  // Гаряча заміна
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
};
