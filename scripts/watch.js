process.env.NODE_ENV = 'development';
const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const webpack = require('webpack');
const webpackconfig = require('react-scripts/config/webpack.config.js');
const child_process = require('child_process');
const config = webpackconfig('development');
const { readdir, stat } = require("fs").promises
const { join } = require("path")
const rimraf = require("rimraf");
// removes react-dev-utils/webpackHotDevClient.js at first in the array
config.entry.shift();

webpack(config).watch({
    delay: 1000
}, async (err, stats) => {
    if (err) {
        console.error(err);
    } else {
        await builder();
    }

    console.error(stats.toString({
        chunks: false,
        colors: true
    }));
});

async function builder() {
    const isWin = process.platform === "win32";
    const nodeEnv = isWin ? 'SET NODE_ENV=production' : 'NODE_ENV=production'
    const getFileToDel = async path => {
        let dirs = []
        for (const file of await readdir(path)) {
            if (!file.includes('index')) {
                dirs = [...dirs, `${path}/${file}`]
            }
        }
        return dirs
    }
    const toDel =  await getFileToDel('dist');
    for(const folder of toDel){
        // rimraf(folder, () => console.log(`Deleted ${folder}`))
    }
    child_process.exec(`${nodeEnv} && babel src --out-dir dist --copy-files --ignore __tests__,spec.js,test.js,__snapshots__"`)
}