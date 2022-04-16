const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
	constructor(opts) {
		const userDataPath = (electron.app || electron.remote.app).getPath('userData');
		this.path = path.join(userDataPath, opts.configName + '.json');
		console.log(this.path)
		this.data = parseDataFile(this.path, opts.defaults);
	}

	get(key, subkey = null) {
		if (subkey && key) return this.data[key][subkey];
		return this.data[key];
	}

	set(key, val, subkey = null) {
		if (subkey && key) this.data[key][subkey] = val;
		else this.data[key] = val;
		fs.writeFileSync(this.path, JSON.stringify(this.data));
	}
}

function parseDataFile(filePath, defaults) {
	try {
		return JSON.parse(fs.readFileSync(filePath));
	} catch (error) {
		fs.writeFileSync(filePath, JSON.stringify(defaults));
		return defaults;
	}
}

module.exports = Store;
