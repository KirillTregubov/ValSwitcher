const { app, BrowserWindow, ipcMain, session } = require('electron')
const isDev = require('electron-is-dev')
const path = require('path')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const Store = require('./store.js')
const Account = require('./account.js')
const yaml = require('js-yaml')
const fs = require('fs')

;(async () => {
  /* Variables */
  let mainWindow
  let token = null

  /* Defaults */
  const defaultUserData = {
    accounts: []
  }
  const defaults = {
    token: null,
    windowDimensions: { width: 900, height: 500 }, // Electron window is 16px slimmer and 39px shorter
    userData: defaultUserData
  }

  /* Initialize Subsystems */
  const store = new Store({
    defaults: defaults
  })

  // const pw = store.get('token');
  // const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
  // let decryptedData = decipher.update(pw, "hex", "utf-8");
  // decryptedData += decipher.final("utf8");
  // console.log(decryptedData);

  // async function createWindow() {
  // }

  /* TODO: Move code here */
  // app.whenReady().then(() => {
  //   if (isDev) {
  //     const {
  //       default: installExtension,
  //       REACT_DEVELOPER_TOOLS
  //     } = require('electron-devtools-installer')

  //     installExtension(REACT_DEVELOPER_TOOLS)
  //       .then((name) => console.log(`Added Extension:  ${name}`))
  //       .catch((err) => console.log('An error occurred: ', err))
  //   }
  // })

  app.whenReady().then(async () => {
    const windowDimensions = store.get('windowDimensions')

    let width, height
    if (windowDimensions == null) {
      ;({ width, height } = defaults.windowDimensions)
    } else {
      ;({ width, height } = windowDimensions)
    }

    mainWindow = new BrowserWindow({
      show: false,
      width: width,
      height: height,
      minWidth: 800,
      minHeight: 500,
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
    mainWindow.removeMenu()

    mainWindow.webContents.session.webRequest.onHeadersReceived(
      (details, callback) => {
        callback({
          responseHeaders: {
            ...details.responseHeaders,
            'Content-Security-Policy': ["script-src 'self'"]
          }
        })
      }
    )

    await mainWindow
      .loadURL(
        isDev
          ? 'http://localhost:3000'
          : `file://${path.join(__dirname, '../build/index.html')}`
      )
      .then(() => {
        mainWindow.show()
      })

    if (isDev) {
      mainWindow.webContents.openDevTools({ mode: 'detach' })
    }

    mainWindow
      .on('closed', () => {
        mainWindow = null
      })
      /* TODO: Open Issue - isn't triggered unless devtools is open */
      // .on('ready-to-show', () => {
      //   mainWindow.show()
      //   mainWindow.focus()
      // })
      .on('resize', () => {
        let { width, height } = mainWindow.getBounds()
        store.set('windowDimensions', { width, height })
      })
    // TODO: allow reset resize
  })

  /**
   * Asynchronous communication between renderer and main process
   */

  /**
   * Authentication Events
   *
   * @event is-authenticated - Check if authentication token exists
   * @returns {boolean} - Status of authentication
   *
   * @event can-authenticate - Checks if user exists
   * @returns {boolean} - User exists
   *
   * @event register - Register user
   * @param {string} password - Password
   * @param {string} newPassword - New Password (optional, used to change password)
   * @returns {boolean} - Registration success
   *
   * @event login - Login user
   * @param {string} password - Password
   * @returns {boolean} - Login success
   *
   * @event logout - Logout user
   * @returns {boolean} - Logout success
   */

  ipcMain.on('is-authenticated', async (event) => {
    // const token = store.get('token')
    event.returnValue = !(token == null)
  })

  ipcMain.on('can-authenticate', async (event) => {
    const token = store.get('token')
    event.returnValue = !(token == null)
  })

  ipcMain.on('register', async (event, args) => {
    const storedToken = store.get('token')
    let inputToken = args.password
    if (storedToken) {
      if (
        inputToken &&
        !(args.newPassword == null) &&
        inputToken !== args.newPassword
      ) {
        const isTokenValid = await bcrypt.compare(inputToken, storedToken)
        if (isTokenValid) {
          console.log('Resetting password')
          inputToken = args.newPassword
        } else {
          console.log('Registering')
        }
      } else {
        console.log('Already registered')
        event.returnValue = false
        return
      }
    }

    const salt = await bcrypt.genSalt()
    const encryptedData = await bcrypt.hash(inputToken, salt)
    store.set('token', encryptedData)

    if (inputToken === args.password) {
      store.set('userData', defaultUserData)
    }

    token = crypto
      .createHash('sha256')
      .update(String(inputToken))
      .digest('base64')
      .substring(0, 32)
    event.returnValue = true
  })

  ipcMain.on('login', async (event, args) => {
    const encryptedData = store.get('token')
    const inputToken = args.password
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
      console.log('inputToken ' + inputToken)
      console.log('token ' + token)
    }

    event.returnValue = isTokenValid
  })

  ipcMain.on('logout', async (event) => {
    const encryptedData = store.get('token')
    if (!encryptedData) {
      event.returnValue = false
      return
    }

    token = null
    event.returnValue = true
  })

  /**
   * Account Events
   *
   * @event create-account - Create account
   * @param {string} username - Username
   * @param {string} agent - Agent
   * @returns {boolean} - Account creation success
   *
   * @event username-taken - Check if username is taken
   * @param {string} username - Username
   * @returns {boolean} - Username is taken
   *
   * @event get-account - Get account
   * @returns {object} - Account data
   *
   * @event get-accounts - Get accounts
   * @returns {array} - Array of accounts
   *
   * @event authenticate-account - Authenticate account
   * @param {string} username - Username
   * @returns {boolean} - Account authentication success
   *
   * @event delete-account - Delete account
   * @param {string} username - Username
   * @returns {boolean} - Account deletion success
   */

  ipcMain.on('create-account', (event, args) => {
    if (!token) {
      event.returnValue = { success: false, message: 'Not Authenticated' }
      return
    }

    const username = args.username
    if (!username) {
      event.returnValue = { success: false, message: 'No Username' }
      return
    }
    const agent = args.agent
    if (!agent) {
      event.returnValue = { success: false, message: 'No Agent' }
      return
    }
    const alias = args.alias

    const accounts = store.get('userData', 'accounts')
    const oldLength = accounts.length
    accounts.push(new Account(username, agent, alias))
    store.set('userData', accounts, 'accounts')
    if (oldLength === accounts.length) {
      event.returnValue = {
        success: false,
        message: 'Failed to Update Accounts'
      }
      return
    }
    event.sender.send('accounts-updated', accounts)
    event.returnValue = { success: true, data: accounts }
  })

  ipcMain.on('username-taken', (event, args) => {
    if (!token) {
      event.returnValue = { success: false, message: 'Not Authenticated' }
      return
    }

    const username = args.username
    if (!username) {
      event.returnValue = { success: false, message: 'No Username' }
      return
    }

    const accounts = store.get('userData', 'accounts')
    const account = accounts.find((account) => account.username === username)
    if (!!account) {
      event.returnValue = { success: true, data: true }
      return
    }
    event.returnValue = { success: true, data: false }
  })

  const getAccount = (username) => {
    const accounts = store.get('userData', 'accounts')
    const account = accounts.find((account) => account.username === username)

    if (!account) {
      return null
    }
    return account
  }

  ipcMain.on('get-account', (event, args) => {
    if (!token) {
      event.returnValue = { success: false, message: 'Not Authenticated' }
      return
    }

    const username = args.username
    if (!username) {
      event.returnValue = { success: false, message: 'No Username' }
      return
    }

    const account = getAccount(username)
    if (!account) {
      event.returnValue = { success: false, message: 'No Account' }
      return
    }
    event.returnValue = { success: true, data: account }
  })

  ipcMain.on('get-accounts', (event) => {
    if (!token) {
      event.returnValue = { success: false, message: 'Not Authenticated' }
      return
    }

    const accounts = store.get('userData', 'accounts')

    if (!Array.isArray(accounts)) {
      event.returnValue = {
        success: false,
        message: 'Error accessing stored accounts'
      }
      return
    }
    event.returnValue = { success: true, data: accounts }
  })

  ipcMain.on('authenticate-account', async (event, args) => {
    console.log('open')

    if (!token) {
      event.returnValue = { success: false, message: 'Not Authenticated' }
      return
    }

    const username = args.username
    if (!username) {
      event.returnValue = { success: false, message: 'No Username' }
      return
    }

    const account = getAccount(username)
    if (!account) {
      event.returnValue = { success: false, message: 'Account not found' }
      return
    }
    console.log('get account ', account) // TODO: remove

    const popup = new BrowserWindow({
      parent: mainWindow,
      show: false,
      width: 450,
      height: 800,
      resizable: false,
      center: true,
      minimizable: false,
      maximizable: false,
      fullscreenable: false,
      title: 'Authenticate with Riot Games'
    })
    popup.removeMenu()

    const ses = popup.webContents.session
    ses.clearStorageData({ storages: ['cookies'] })
    ses.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': [
            "script-src * 'unsafe-eval' 'unsafe-inline' blob:"
          ]
        }
      })
    })

    if (isDev) {
      popup.webContents.openDevTools({ mode: 'detach' })
    }

    popup
      .on('page-title-updated', (event, title) => {
        console.log('changed page title to: ', title) // TODO: remove
        if (title === 'Riot Account Management') {
          console.log('FINISHED') // TODO: remove
          ses.cookies
            .get({})
            .then(async (cookieArray) => {
              const cookies = cookieArray.filter((item) => {
                return (
                  item.domain.includes('auth.riotgames.com') ||
                  (item.domain.includes('riotgames.com') &&
                    item.name === 'tdid')
                )
              })

              console.log('cookies ', cookies) // TODO: remove
              console.log(cookies.every((cookie) => !cookie.session))
              if (!cookies.every((cookie) => !cookie.session)) {
                console.log('wrong session')
                mainWindow.webContents.send('used-session')
                return
              }

              const userData = {
                'riot-login': {
                  persist: {
                    region: 'NA',
                    session: {
                      cookies
                    }
                  }
                }
              }

              let yamlStr = yaml.dump(userData)
              console.log('user data ', userData) // TODO: remove
              console.log('yamlStr ', yamlStr) // TODO: remove

              await fs.writeFileSync(
                `${app.getPath('userData')}/${username}.yaml`,
                yamlStr,
                'utf8'
              )

              // TODO: save cookie file to this account

              mainWindow.webContents.send('authenticate-account', {
                success: true
              })

              // File destination.txt will be created or overwritten by default.
              // fs.copyFile('source.txt', 'destination.txt', (err) => {
              //   if (err) throw err
              //   console.log('source.txt was copied to destination.txt')
              // })

              // await fs.writeFileSync(
              //   app.getPath('appData') +
              //     '\\..\\Local\\Riot Games\\Riot Client\\Data\\RiotGamesPrivateSettingsTEST.yaml',
              //   yamlStr,
              //   'utf8'
              // )

              // regions: 'NA', 'EU', 'AP', 'KR', 'LATAM', 'BR'
            })
            .catch((err) => {
              console.error(err)
            })
            .finally(() => {
              console.log('closed')
              popup.destroy()
              mainWindow.setEnabled(true)
            })
        }
        event.preventDefault()
      })
      .on('closed', () => {
        mainWindow.setEnabled(true)
        mainWindow.focus()
      })
      .on('ready-to-show', () => {
        popup.show()
      })

    await popup.loadURL('https://account.riotgames.com')

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

  ipcMain.on('delete-account', (event, args) => {
    if (!token) {
      event.returnValue = { success: false, message: 'Not Authenticated' }
      return
    }

    const username = args.username
    if (!username) {
      event.returnValue = { success: false, message: 'No Username' }
      return
    }

    const accounts = store.get('userData', 'accounts')
    const oldLength = accounts.length
    const newAccounts = accounts.filter(
      (account) => account.username !== username
    )
    store.set('userData', newAccounts, 'accounts')
    const updatedAccounts = store.get('userData', 'accounts')

    if (oldLength === updatedAccounts.length) {
      event.returnValue = { success: false, message: 'Account not found' }
      return
    }
    event.returnValue = { success: true }
  })

  /* OLD IPC
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
  */
})()
