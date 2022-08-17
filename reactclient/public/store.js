const { app } = require('electron')
const { join } = require('path')
const { readFileSync, writeFileSync } = require('fs')

function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(readFileSync(filePath))
  } catch (error) {
    writeFileSync(filePath, JSON.stringify(defaults))
    return defaults
  }
}

class Store {
  constructor(opts) {
    // (electron.app || electron.remote.app)
    const userDataPath = app.getPath('userData')
    this.path = join(userDataPath, 'store.json')
    console.log(this.path)
    this.data = parseDataFile(this.path, opts.defaults)
  }

  get(key, subkey = null) {
    if (subkey && key) return this.data[key][subkey]
    return this.data[key]
  }

  set(key, val, subkey = null) {
    if (subkey && key) this.data[key][subkey] = val
    else this.data[key] = val
    writeFileSync(this.path, JSON.stringify(this.data))
  }
}

module.exports = Store
