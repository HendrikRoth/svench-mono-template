const fs = require('fs')
const path = require('path')

// cross-env SVENCH=1 nollup
// --hot
// --port 42421
// --virtual-write public
// --watch src
// --watch '.svench/*'
// --watch node_modules/svench/tmp
// --config

const packagesDir = 'packages'

module.exports = {
  hot: true,
  port: 42421,
  publicPath: 'svench',
  baseUrl: 'svench',
  watch: [
    fs
      .readdirSync(path.resolve(__dirname, packagesDir))
      .map(name => path.join(packagesDir, name)),
    '.svench/*',
    'node_modules/svench/tmp',
  ],
}
