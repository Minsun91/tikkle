const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',    // 배포할때는 'production'변경
    devtool: 'eval',        // eval은 빌드하는 속도를 빠르게 해준다. 배포할때는 'hidden-source-map' 변경
    watch: true,     // 저장할때마다 자동으로 빌드 해준다.!
    context: __dirname, 
    resolve: {       
        extensions: ['.js', '.css', '.scss', '.html']
    },
    entry: {
        app: path.join(__dirname, 'src', 'App.js'),
    },    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }        
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ],
    output: {
        publicPath: '/dist/',    //웹 서버에서 배포할 기본 경로를 뜻한다.  webpack-dev-server을 사용할때 추가해줘야 한다. 안그러면 에러난다.
        filename: '[name].js',   //[name].js으로 해주면 아라서 위에 entry에 있는 app이 [name].js로 들어간다.
        path: path.join(__dirname, 'dist')
    },
};
