<template>
  <div class="container">
    <img src="/nuxt-black.png">
    <h2>Thank you for testing Nuxtron</h2>
    <p>Loaded from the {{ name }}</p>
    <p>
      <NuxtLink to="/home">
        Back home
      </NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  layout: 'default',
  asyncData ({ req }) {
    return {
      name: process.static ? 'static' : (process.server ? 'server' : 'client'),
    }
  }
}
</script>