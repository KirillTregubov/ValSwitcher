// const yaml = require('js-yaml')
// const fs = require('fs')

class Account {
  constructor(username, agent, alias) {
    this.username = username
    this.agent = agent
    if (!!alias) {
      this.alias = alias
    }
    this.authenticated = false
  }

  // async saveAuthentication() {}
}

module.exports = Account

// ;(async () => {
//   let browser
//   let page

//   async function saveCookies(page, event, accounts) {
//     try {
//       await page.waitForSelector('#riot-id', { visible: true, timeout: 10000 })
//       let cookieArray = (await page._client.send('Network.getAllCookies'))
//         .cookies
//       let cookies = cookieArray.filter((item) => item.domain.includes('auth'))
//       // let cookies = (await page._client.send('Network.getAllCookies')).cookies.filter(item => item.domain.includes('auth'));
//       let data = {
//         private: {
//           'riot-login': {
//             persist: {
//               region: 'NA',
//               session: {
//                 cookies
//               }
//             }
//           }
//         }
//       }
//       let yamlStr = yaml.dump(data)
//       // TEST is temp
//       await fs.writeFileSync(
//         process.env.APPDATA +
//           '\\..\\Local\\Riot Games\\Riot Client\\Data\\RiotClientPrivateSettingsTEST.yaml',
//         yamlStr,
//         'utf8'
//       )

//       await browser.close()
//       // event.reply('reply-worked', accounts[accounts.length - 1]);
//       return cookies
//     } catch (err) {
//       throw new Error()
//     }
//   }

//   class Account {
//     constructor(username, password) {
//       this.username = username
//       this.password = password
//     }

//     static async downloadProfile(event, decryptedData) {
//       browser = await puppeteer.launch({ headless: false })
//       page = await browser.newPage()
//       await page.goto('https://account.riotgames.com/')

//       const username = this.username
//       await page.waitForSelector("[data-testid='input-username']")
//       await page.waitForTimeout(1000)
//       await page.type("[data-testid='input-username']", username, { delay: 10 })

//       await page.waitForSelector("[data-testid='input-password']")
//       await page.type("[data-testid='input-password']", decryptedData, {
//         delay: 10
//       })

//       await page.click("[data-testid='btn-signin-submit']")

//       console.log('Submitted details')
//       Account.saveProfile(event)
//     }

//     static async submitMfa(event, mfaCode) {
//       if (mfaCode.length !== 6 || isNaN(mfaCode)) {
//         event.reply('mfa-request', 'Code must be 5 characters long.')
//         return
//       }

//       await page.waitForSelector("[data-testid='input-mfa']")
//       await page.type("[data-testid='input-mfa']", mfaCode, { delay: 10 })
//       await page.keyboard.press('Enter')

//       // handle retry

//       console.log('logged in')
//       Account.saveProfile(event)
//     }

//     static async saveProfile(event) {
//       try {
//         const cookies = await saveCookies(page, event)
//         console.log(cookies)
//         await browser.close()
//       } catch (err) {
//         await page.waitForSelector('.mfa-prompt', { visible: true })

//         let element = await page.$$("[data-testid='panel-subtitle'] > strong")
//         const email = await page.evaluate(
//           (element) => element.textContent,
//           element[0]
//         )

//         event.reply('mfa-request', email)
//       }
//     }
//   }

//   module.exports = Account
// })()
