<template>
    <div class="flex">
        <div v-if="accounts.length > 0">
            Account List
            <div v-for="account in accounts" :key="account.username">
                <h1>{{account.username}}</h1>
                <button @click="switchAccount(account)">Switch</button>
            </div>
        </div>
        <div v-else class="inline-flex relative bg-valred text-valblack py-6 px-20 rounded-2xl mx-auto">
            <div class="mx-auto">
                <h1 class="font-bold text-xl mb-4">Add an account to get started</h1>
                <AddAccount class="inline-block" v-on:addAccount="addAccount" />
            </div>
            <img class="-mr-16 ml-16 pt-16 w-36" src="~assets/images/sage.png" alt="">
        </div>
    </div>
</template>

<script>
const {ipcRenderer} = require('electron');

export default {
    data() {
        return {
            accounts: []
        }
    },
    methods: {
        addAccount(value) {
            value.current = true;
            this.accounts.push(value);
        },
        switchAccount(account) {
            ipcRenderer.on('reply-worked', (arg) => {
                addAccount(arg);
            })
            ipcRenderer.send('switch-account', account);
        }
    }
}
</script>