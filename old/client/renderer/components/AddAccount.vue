<template>
    <div>
        <div>
            <label for="username" class="mx-2 text-sm font-medium">Username</label>
            <input type="text" name="username" v-model="username" class="block border p-1 mx-2 mb-3 rounded bg-valblack-light border-valblack text-valbeige focus:outline-none focus:ring ring-valpink" />
            <label for="password" class="mx-2 text-sm font-medium">Password</label>
            <input type="password" name="password" v-model="password" class="block border p-1 mx-2 mb-4 rounded bg-valblack-light border-valblack text-valbeige focus:outline-none focus:ring ring-valpink" />
            <button class="mx-2 py-2 px-4 rounded-md bg-valblack-light text-valbeige focus:outline-none focus:ring ring-valpink" @click="login()">Login</button>
        </div>
        <!-- {{ askMFA }}
        <button @click="toggle()">click</button> -->
        <Popup :toggle="askMFA">
          <h1 class="mb-4">Please enter the code that was sent to {{email}}.</h1>
          <label for="token" class="mx-2 text-sm font-medium">Security Code</label>
          <input type="text" name="token" v-model="mfaCode" class="block max-w-xs border p-1 mx-2 mb-3 rounded bg-valblack-light border-valblack text-valbeige focus:outline-none focus:ring ring-valpink" />
          <div>
            <button class="mx-2 py-2 px-4 rounded-md bg-valblack-light text-valbeige focus:outline-none focus:ring ring-valpink" @click="sendMFA()">Submit</button>
            <button class="px-1 focus:outline-none focus:ring ring-valpink" @click="cancelMFA()">Cancel</button>
          </div>
         </Popup>
    </div>
</template>

<script>
const {ipcRenderer} = require('electron');

export default {
  data() {
    return {
      // username: '',
      // password: '',
      askMFA: false,
      mfaCode: '',
      email: 'your email'
    }
  },
  methods: {
    login() {
      ipcRenderer.on('mfa-request', (event, arg) => {
        if (arg.indexOf('@') !== -1) {
          this.email = arg
        }
        this.handleMFA()
      })
      ipcRenderer.on('reply-worked', (event, arg) => {
        this.$emit('addAccount', arg);
      })
      ipcRenderer.send('add-account', {
        username: this.username,
        password: this.password
      });
    },
    toggle() {
      this.askMFA = !this.askMFA;
    },
    handleMFA() {
      console.log("Received MFA Request");
      this.askMFA = true;
    },
    sendMFA() {
      ipcRenderer.send('send-mfa', this.mfaCode);
      this.askMFA = false;
    },
    cancelMFA() {
      this.askMFA = false;
      ipcRenderer.send('cancel-mfa');
      // TODO
    }
    // testCookies() {
    //   console.log("testing");
    //   ipcRenderer.send('test-cookies');
    // }
  }
}
</script>