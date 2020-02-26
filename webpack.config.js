const path = require('path');

module.exports = {
    module:{
        rules:[
        {
            test: /\.ts$/,
            include: [path.resolve(__dirname, 'src/ts')],
            loader: 'ts-loader'
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
    resolve:{
        extensions:[".js",".json",".jsx",".css",".ts","webpack.js",".scss"],
        alias:{
            '@helpers': path.resolve(__dirname,'src/ts/helpers'),
            'css': path.resolve(__dirname, 'src/css'),
            'scss': path.resolve(__dirname, 'src/scss')
        }
    },
    
}