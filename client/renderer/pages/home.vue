<template>
  <div>
    <div class="flex items-center justify-center space-x-2 py-6">
      <img class="block w-44" src="~assets/images/ValorantLogo.svg" />
      <h1 class="text-2xl pt-1 font-valorant leading-none">Switcher</h1>
    </div>
    <AccountList />

    <NuxtLink to="/about">About</NuxtLink>
    
    <!-- <div class="inline-block align-bottom bg-valblack-light rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
    </div> -->

    <a class="inline-block bg-valbeige text-valblack font-bold p-2 rounded" @click="testCookies()">Test Cookies</a>
    <a class="inline-block bg-valbeige text-valblack2 font-bold p-2 rounded" @click="testCookies()">Test Cookies</a>
  </div>
</template>

<style lang="postcss">
</style>