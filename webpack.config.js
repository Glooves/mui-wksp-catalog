// more_webpack_practice project using express, pug, templates.

import path  from "path";
import webpack from 'webpack';
import { getGlobals } from 'common-es'
const { __dirname, __filename } = getGlobals(import.meta.url)
import { doDebug, debPrint } from 'glvlib/DebUtils.js'
if (doDebug) {
    debPrint `Doing webpack for ${path.basename(__dirname)}`;
}
// importing plugins that do not come by default in webpack
import DashboardPlugin from 'webpack-dashboard/plugin/index.js';

/// Try not doing this for server operation:
import HtmlWebpackPlugin from 'html-webpack-plugin';

const node_env = process.env.NODE_ENV;
let wkspPkgDir = process.env.WORKSPACE 
const ASSET_PATH = process.env.ASSET_PATH || '/';

wkspPkgDir ||= '_ERROR_WORKSPACE_NOT_SET'
const pkgdir = path.basename(wkspPkgDir)

const port = 4001;

const isProduction = (node_env && node_env === 'production');
let __webpack_public_path__;
if (!node_env) {
    process.env['NODE_ENV'] = 'development';
    __webpack_public_path__ = 'https://localhost:4001/';
}
if (isProduction) {
    __webpack_public_path__ = 'https://cdn.example.com/';
    console.log('Welcome to production');
}


const buildDir = path.resolve(__dirname, pkgdir);
debPrint(`Building into ${buildDir}`)

const stylesHandler = "style-loader";
const htmlHandler = new HtmlWebpackPlugin();

const config = {
    entry: {
        main: "./src/main.tsx",
        HelloRob: "./src/HelloRob.tsx"
    },
    target: 'browserslist',
    output: {
        path: path.resolve(__dirname, pkgdir),
        filename: '[name].js',
        clean: true,
    },
    devServer: {
        static: {
          directory: path.join(__dirname, pkgdir), // Or your output directory
        },
        port, // Your desired port
        historyApiFallback: true, // Enables client-side routing
    },
    externals: [],
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
        }),
        // compile time plugins
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
        // webpack-dev-server enhancement plugins
        new DashboardPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                type: "asset",
                use: [htmlHandler.loader]
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader"],
                type: "asset/source"
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
                type: "asset/resource"
            },
            {
                test: /\.(ts|tsx)$/i,
                use: ["ts-loader", "file-loader"],
                exclude: /node_modules/,
                type: "asset/source"
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    },
};

export default () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    debPrint("pushing the webpack config")
    return config;
};
