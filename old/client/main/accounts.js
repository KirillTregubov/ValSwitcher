// import { ipcRenderer } from 'electron';
// const puppeteer = require('puppeteer');
// const url = "https://auth.riotgames.com/login#scope=openid%20email%20profile%20riot%3A%2F%2Friot.atlas%2Faccounts.edit%20riot%3A%2F%2Friot.atlas%2Faccounts%2Fpassword.edit%20riot%3A%2F%2Friot.atlas%2Faccounts%2Femail.edit%20riot%3A%2F%2Friot.atlas%2Faccounts.auth%20riot%3A%2F%2Fthird_party.revoke%20riot%3A%2F%2Fthird_party.query%20riot%3A%2F%2Fforgetme%2Fnotify.write%20riot%3A%2F%2Friot.authenticator%2Fauth.code&state=6ed58082-b376-4041-830c-08d2c5da4508&acr_values=urn%3Ariot%3Agold&client_id=accountodactyl-prod&redirect_uri=https%3A%2F%2Faccount.riotgames.com%2Foauth2%2Flog-in&response_type=code";
// console.log("hello");
// (async () => {
//     const browser = await puppeteer.launch({ headless: false })
//     const page = await browser.newPage()
//     await page.goto(url)
//     const title = await page.title()
//     console.log(title)
//     //await page.keyboard.down('Tab');
//     //await page.waitForSelector("[name='username']")
//     await page.keyboard.type('onlyspectra');
//     await page.keyboard.down('Tab');
//     await page.keyboard.type('alimisfag123');

//     // data-testid="btn-signin-submit"
//     ipcRenderer.send('2fa-request');
//     //data-testid="input-username"
//     //await browser.close()
// })()

// const Store = require('electron-store');
const puppeteer = require('puppeteer');
const fs = require('fs');
const yaml = require('js-yaml');
let browser;
let page;
let timeout = 3000;

class Accounts {
    constructor() {
        this.accounts = [];
    }

    size() {
        return this.accounts.length;
    }

    add(event, username, password) {
        this.accounts.push({username, password});
        (async () => {
            // { headless: false }
            browser = await puppeteer.launch({ headless: false })
            page = await browser.newPage()
            await page.goto("https://account.riotgames.com/")
            await page.waitForSelector("[data-testid='input-username']")
            await page.keyboard.type(username);
            await page.keyboard.down('Tab');
            await page.keyboard.type(password);
            await page.keyboard.press('Enter');
            try {
              await page.waitForSelector('.mfafield', { visible: true });
              let element = await page.$$("[data-testid='panel-subtitle']");
              let text = await page.evaluate(element => element.textContent, element[0]);
              let match = text.match(/([a-zA-Z0-9._\-*]+@+[a-zA-Z0-9._\-*]+\.[a-zA-Z0-9_-])/)[0]
              let email = '';
              if (match.indexOf('@') !== -1) {
                email = match;
              }
              event.reply('mfa-request', email);
            } catch (e) {
              saveCookies(event);
            }
            //data-testid="input-username"
            //await browser.close()
          })()
    }

    continue(event, code) {
        (async () => {
            if (code.length != 5) {
              event.reply('mfa-request', 'Code must be 5 characters long.');
              return;
            }
            await page.waitForSelector('[data-testid="input-mfa"]');
            await page.keyboard.type(code);
            await page.keyboard.press('Enter');
        
            try {
              await page.waitForSelector('.status-message', { timeout: timeout });
              let element = await page.$$('.status-message');
              let text = await page.evaluate(element => element.textContent, element[0]);
              if (text && text.length > 0) {
                event.reply('mfa-request', text)
                return;
              }
            } catch (e) {
            }
            saveCookies(event, this.accounts);
        })()
    }

    cancel() {
      (async () => {
        await browser.close()
        // delete last user if no cookies
      })()
    }

    switch(event, account) {
      console.log(account);
      (async () => {
        // { headless: false }
        browser = await puppeteer.launch({ headless: false }); // true
        page = await browser.newPage();
        // await page.setCookie(...cookies);
        await page.goto("https://account.riotgames.com/");
        saveCookies(event, this.accounts);
        //data-testid="input-username"
        //await browser.close()
      })()
      //await page.setCookie(...cookies);
    }
}

function saveCookies(event, accounts) {
  (async () => {
    await page.waitForSelector('#riot-id', { visible: true });
    let cookieArray = (await page._client.send('Network.getAllCookies')).cookies;
    let cookies = cookieArray.filter(item => item.domain.includes('auth'));
    // let cookies = (await page._client.send('Network.getAllCookies')).cookies.filter(item => item.domain.includes('auth'));
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
    if (!('cookie' in accounts[accounts.length-1])) {
      accounts[accounts.length-1].cookies = cookies;
    }
    await browser.close();
    event.reply('reply-worked', accounts[accounts.length-1]);
  })()
}

// expose the class
module.exports = Accounts;