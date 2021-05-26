import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import {
  createWindow,
  exitOnChange,
} from './helpers';
const Accounts = require('./accounts');
const accounts = new Accounts();

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  exitOnChange();
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  let mainWindow = createWindow('main', {
    width: 800,
    height: 600,
    // resizable: false,
    backgroundColor: '#0f1822',
  });

  mainWindow.removeMenu();

  if (isProd) {
    await mainWindow.loadURL('app://./home');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
})();

ipcMain.on('add-account', (event, arg) => {
  accounts.add(event, arg.username, arg.password);
});

ipcMain.on('send-mfa', (event, arg) => {
  accounts.continue(event, arg);
});

ipcMain.on('cancel-mfa', () => {
  accounts.cancel();
});

ipcMain.on('switch-account', (event, arg) => {
  try {
    accounts.switch(event, arg);
  } catch (e) {
    accounts.add(event, arg.username, arg.password);
  }
});

/*
let browser;
let page;
ipcMain.on('scrape', (event, arg) => {
  console.log('size:', mainWindow.getSize());
  return;
  const url = "https://account.riotgames.com/";
  // https://auth.riotgames.com/login#scope=openid%20email%20profile%20riot%3A%2F%2Friot.atlas%2Faccounts.edit%20riot%3A%2F%2Friot.atlas%2Faccounts%2Fpassword.edit%20riot%3A%2F%2Friot.atlas%2Faccounts%2Femail.edit%20riot%3A%2F%2Friot.atlas%2Faccounts.auth%20riot%3A%2F%2Fthird_party.revoke%20riot%3A%2F%2Fthird_party.query%20riot%3A%2F%2Fforgetme%2Fnotify.write%20riot%3A%2F%2Friot.authenticator%2Fauth.code&state=6ed58082-b376-4041-830c-08d2c5da4508&acr_values=urn%3Ariot%3Agold&client_id=accountodactyl-prod&redirect_uri=https%3A%2F%2Faccount.riotgames.com%2Foauth2%2Flog-in&response_type=code";
  console.log("hello");
  (async () => {
    // { headless: false }
    browser = await puppeteer.launch({ headless: false })
    page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector("[data-testid='input-username']")
    await page.keyboard.type(arg.username);
    await page.keyboard.down('Tab');
    await page.keyboard.type(arg.password);
    await page.keyboard.press('Enter');
    try {
      const element = await page.waitForSelector('.mfafield', { visible: true });
      event.reply('mfa-request')
    } catch (e) {
      console.log('error')
      console.log('wait for redirects');
    await page.waitForSelector('#riot-id', { visible: true });
    const title = await page.title()
    console.log(title)
    // const cookies = await page.cookies();
    // Here we can get all of the cookies
    let cookieArray = (await page._client.send('Network.getAllCookies')).cookies;
    let cookies = cookieArray.filter(item => item.domain.includes('auth'));
    let data = {
      private: {
        'riot-login': {
          persist: {
            region: 'NA',
            session: {
              cookies
            }
          }
        }
      }
    };
    let yamlStr = yaml.dump(data);
    await fs.writeFileSync(process.env.APPDATA + "\\..\\Local\\Riot Games\\Riot Client\\Data\\RiotClientPrivateSettings.yaml", yamlStr, 'utf8');
    event.reply('reply-worked')
    }
    //data-testid="input-username"
    //await browser.close()
  })()
});

ipcMain.on('send-mfa', (event, arg) => {
  (async () => {
    if (arg.length != 5) {
      event.reply('mfa-request', 'Code must be 5 characters long.');
      return;
    }
    console.log("HELLO WRLD");
    await page.waitForSelector('[data-testid="input-mfa"]');
    //await page.waitForNavigation({waitUntil: 'networkidle2'});
    await page.keyboard.type(arg);
    await page.keyboard.press('Enter');

    try {
      await page.waitForSelector('.status-message', {
        timeout: 1000
      });
      let element = await page.$$('.status-message');
      let text = await page.evaluate(element => element.textContent, element[0]);
      if (text && text.length > 0) {
        event.reply('mfa-request', text)
      }
    } catch (e) {
      console.log("ignore error");
    }
    console.log('wait for redirects');
    await page.waitForSelector('#riot-id', { visible: true });
    const title = await page.title()
    console.log(title)
    // const cookies = await page.cookies();
    // Here we can get all of the cookies
    let cookieArray = (await page._client.send('Network.getAllCookies')).cookies;
    let cookies = cookieArray.filter(item => item.domain.includes('auth'));
    let data = {
      private: {
        'riot-login': {
          persist: {
            region: 'NA',
            session: {
              cookies
            }
          }
        }
      }
    };
    let yamlStr = yaml.dump(data);
    await fs.writeFileSync(process.env.APPDATA + "\\..\\Local\\Riot Games\\Riot Client\\Data\\RiotClientPrivateSettings.yaml", yamlStr, 'utf8');
    event.reply('reply-worked')
  })()
});

ipcMain.on('test-cookies', (event, arg) => {
  (async () => {
    let data = {
      private: {
        'riot-login': {
          persist: {
            region: 'NA',
            session: {
              cookies
            }
          }
        }
      }
    };
    let yamlStr = yaml.dump(data);
    await fs.writeFileSync(process.env.APPDATA + "\\..\\Local\\Riot Games\\Riot Client\\Data\\RiotClientPrivateSettingsTest.yaml", yamlStr, 'utf8');
  })()
});
*/

app.on('window-all-closed', () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null || BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
