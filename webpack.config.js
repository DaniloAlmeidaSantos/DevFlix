const path = require('path');

module.exports = {
    module:{
        rules:[
        {
            test: /\.m?js$/,
            include: [path.resolve(__dirname, 'src/js')],
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']               }
            }
        
        },
        {
            test:/\.css$/,
            include: [path.resolve(__dirname, 'src/css')],
            loader: 'style-loader!css-loader'
        },
        {
            test:/\.s(a|c)ss$/,
            use: ['style-loader','css-loader', 'sass-loader']
        }
    ]
    },
    entry: path.resolve(__dirname, './src/js/app.js'),
    output:{
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
    },
    devtool: 'source-map',
    optimization: {
        minimize: false
    },
    resolve:{
        extensions:[".js",".json",".jsx",".css","webpack.js",".scss"],
        alias:{
            'css': path.resolve(__dirname, 'src/css'),
            'scss': path.resolve(__dirname, 'src/scss'),
            'js': path.resolve(__dirname, 'src/js')
        }
    },
}