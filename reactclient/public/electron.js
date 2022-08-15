const { app, BrowserWindow, ipcMain, session } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const Store = require('./store.js')
const Account = require('./account.js')

;(async () => {
  const defaultUserData = {
    accounts: []
  }

  let window
  let token = null

  const defaults = {
    token: null,
    // 800x600 is the default window size
    windowDimensions: { width: 900, height: 500 },
    userData: defaultUserData
  }

  const store = new Store({
    configName: 'user-data',
    defaults: defaults
  })

  // const pw = store.get('token');
  // const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
  // let decryptedData = decipher.update(pw, "hex", "utf-8");
  // decryptedData += decipher.final("utf8");
  // console.log(decryptedData);

  async function createWindow() {
    const windowDimensions = store.get('windowDimensions')

    let width, height
    if (windowDimensions == null) {
      ;({ width, height } = defaults.windowDimensions)
    } else {
      ;({ width, height } = windowDimensions)
    }

    window = new BrowserWindow({
      width: width,
      height: height,
      minWidth: 800,
      minHeight: 500,
      // resizable: false,
      backgroundColor: '#060A0E',
      webPreferences: {
        contextIsolation: true,
        enableRemoteModule: false,
        nodeIntegration: true,
        preload: path.join(__dirname, 'preload.js') // use preload script
      }
      // titleBarStyle: "hidden",
      // titleBarOverlay: true,
    })
    window.removeMenu()

    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': ["script-src 'self'"]
        }
      })
    })

    await window.loadURL(
      isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    )

    if (isDev) {
      window.webContents.openDevTools({ mode: 'detach' })
    }

    window.on('closed', () => {
      window = null
    })

    window.on('resize', () => {
      // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with
      // the height, width, and x and y coordinates.
      let { width, height } = window.getBounds()
      // Now that we have them, save them using the `set` method.
      store.set('userData', { width, height }, 'windowDimensions')
    })

    // TODO: allow reset resize
  }

  app.on('ready', createWindow)

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', async function () {
    if (window === null) createWindow()
  })

  ipcMain.on('add-account', (event, arg) => {
    if (!token) {
      console.log('Not Authenticated')
      return
    }

    console.log('Add account')

    // Encrypt password
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-cbc', token, iv)
    let encryptedPassword = cipher.update(arg.password, 'utf-8', 'hex')
    encryptedPassword += cipher.final('hex')
    encryptedPassword += iv.toString('hex')

    // Update userData accounts
    const accounts = store.get('userData', 'accounts')
    const oldLength = accounts.length
    accounts.push(new Account(arg.username, encryptedPassword))
    store.set('userData', accounts, 'accounts')
    console.log(accounts)

    event.returnValue = oldLength < accounts.length
  })

  ipcMain.on('get-accounts', (event, arg) => {
    if (!token) {
      console.log('Not Authenticated')
      return null
    }

    const returnArray = []
    console.log('Get accounts')
    const accounts = store.get('userData', 'accounts')
    if (Array.isArray(accounts)) {
      accounts.forEach((account) => {
        const { password, ...returnAccount } = account
        returnArray.push(returnAccount)
      })
    }

    /*
		// Encrypt password
		const iv = crypto.randomBytes(16);
		const cipher = crypto.createCipheriv('aes-256-cbc', token, iv);
		let encryptedPassword = cipher.update('My cool message', "utf-8", "hex");
		encryptedPassword += cipher.final('hex');
		encryptedPassword += iv.toString('hex');

		// Update userData accounts
		
		if (!accounts) {
			store.get('userData', 'accounts');
			accounts = [];
		}
		const oldLength = accounts.length;
		accounts.push(new Account(arg.username, encryptedPassword));
		store.set('userData', accounts, 'accounts');
		console.log(accounts);

		*/
    event.returnValue = returnArray
  })

  // const iv = crypto.randomBytes(16);

  // // create pw
  // let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  // let data = cipher.update('My cool message', "utf-8", "hex");
  // data += cipher.final("hex");
  // console.log("Encrypted message: " + data);
  // store.set('raymanBug', data);

  // // read pw
  // const dbstr = store.get('raymanBug');
  // const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(token), iv);
  // let decryptedData = decipher.update(dbstr, "hex", "utf-8");
  // decryptedData += decipher.final("utf8");
  // console.log("Decrypted message: " + decryptedData);

  ipcMain.on('authenticate', async (event, arg) => {
    event.returnValue = !(token == null)
  })

  ipcMain.on('authenticate-can-register', async (event, arg) => {
    const storedToken = store.get('token')
    event.returnValue = storedToken == null
  })

  ipcMain.on('authenticate-register', async (event, arg) => {
    const storedToken = store.get('token')
    let inputToken = arg.password
    if (storedToken) {
      if (
        inputToken &&
        !(arg.newPassword == null) &&
        inputToken !== arg.newPassword
      ) {
        const isTokenValid = await bcrypt.compare(inputToken, storedToken)
        if (isTokenValid) {
          console.log('Resetting password')
          inputToken = arg.newPassword
        } else {
          console.log('Registering')
        }
      } else {
        console.log('Already registered')
        event.returnValue = false
        return
      }
    }

    // TODO: check if unique

    const salt = await bcrypt.genSalt()
    const encryptedData = await bcrypt.hash(inputToken, salt)
    store.set('token', encryptedData)

    if (inputToken === arg.password) {
      store.set('userData', defaultUserData)
    }

    token = crypto
      .createHash('sha256')
      .update(String(inputToken))
      .digest('base64')
      .substring(0, 32)
    event.returnValue = true
  })

  ipcMain.on('authenticate-login', async (event, arg) => {
    const encryptedData = store.get('token')
    const inputToken = arg.password
    if (!encryptedData || !inputToken) {
      event.returnValue = false
      return
    }

    const isTokenValid = await bcrypt.compare(inputToken, encryptedData)
    if (isTokenValid) {
      token = crypto
        .createHash('sha256')
        .update(String(inputToken))
        .digest('base64')
        .substring(0, 32)
    }

    event.returnValue = isTokenValid
  })

  ipcMain.on('authenticate-logout', async (event) => {
    const encryptedData = store.get('token')
    if (!encryptedData) {
      event.returnValue = false
      return
    }

    token = null
    event.returnValue = true
  })

  ipcMain.on('riot-sync', async (event, arg) => {
    if (!token) {
      console.log('Not Authenticated')
      return
    }

    // Get Username
    const username = arg.username

    /*
    // Get Accounts
    const accounts = store.get('userData', 'accounts')
    if (!Array.isArray(accounts)) {
      store.set('userData', [], 'accounts')
    }

    // Get Current Account
    const currentAccount = accounts.find(
      (account) => account.username === username
    )
    if (!currentAccount) {
      accounts.push({ username })
      store.set('userData', 'accounts', accounts)
    }
    */

    const popup = new BrowserWindow({
      width: 450,
      height: 800,
      resizable: false,
      center: true,
      alwaysOnTop: true
    })
    popup.removeMenu()

    const ses = popup.webContents.session
    ses.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': [
            "script-src * 'unsafe-eval' 'unsafe-inline'"
          ]
        }
      })
    })

    await popup.loadURL('https://account.riotgames.com')

    if (isDev) {
      popup.webContents.openDevTools({ mode: 'detach' })
    }

    event.returnValue = 'end'
    event.reply('riot-sync', 'end')

    // const encryptedData = store.get('token');
    // const inputToken = arg.password;
    // if (!encryptedData || !inputToken) {
    // 	event.returnValue = false;
    // 	return;
    // }

    // const isTokenValid = await bcrypt.compare(inputToken, encryptedData);
    // if (isTokenValid) {
    // 	token = crypto.createHash('sha256').update(String(inputToken)).digest('base64').substring(0, 32);
    // }

    // event.returnValue = isTokenValid;
  })

  ipcMain.on('download-profile', async (event, arg) => {
    if (!token) {
      console.log('Not Authenticated')
      return
    }

    // Get Username
    const username = arg.username

    // Get Accounts
    const accounts = store.get('userData', 'accounts')
    if (!Array.isArray(accounts)) {
      console.log('Accounts is not an array!')
      return
    }
    const currentAccount = accounts.find(
      (account) => account.username === username
    )

    // Get Password
    const encryptedData = currentAccount.password.substring(0, 32)
    const iv = currentAccount.password.substring(32)
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(token),
      Buffer.from(iv, 'hex')
    )
    let password = decipher.update(encryptedData, 'hex', 'utf-8')
    password += decipher.final('utf8')

    await Account.downloadProfile.call(currentAccount, event, password)

    event.returnValue = 'end'

    // const encryptedData = store.get('token');
    // const inputToken = arg.password;
    // if (!encryptedData || !inputToken) {
    // 	event.returnValue = false;
    // 	return;
    // }

    // const isTokenValid = await bcrypt.compare(inputToken, encryptedData);
    // if (isTokenValid) {
    // 	token = crypto.createHash('sha256').update(String(inputToken)).digest('base64').substring(0, 32);
    // }

    // event.returnValue = isTokenValid;
  })

  ipcMain.on('send-mfa', async (event, arg) => {
    if (!token) {
      console.log('Not Authenticated')
      return
    }

    // console.log(arg.mfaCode);

    // Get Username
    const username = arg.username

    // Get Accounts
    const accounts = store.get('userData', 'accounts')
    if (!Array.isArray(accounts)) {
      console.log('Accounts is not an array!')
      return
    }
    const currentAccount = accounts.find(
      (account) => account.username === username
    )

    await Account.submitMfa.call(currentAccount, event, arg.mfaCode)
  })
})()
