const {
	contextBridge,
	ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld("app", {
	emit: (event, args) => {
		ipcRenderer.send(event, args);
	},
	emitSync: (event, args) => {
		return ipcRenderer.sendSync(event, args);
	},
	listen: (eventName, callback) => {
		ipcRenderer.once(eventName, (event, ...args) => callback(...args));
	}
});
