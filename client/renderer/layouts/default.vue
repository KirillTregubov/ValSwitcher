<template>
  <div id="app" class="antialiased font-sans text-white bg-valblack">
    <div class="wrapper">
        <Nuxt />
    </div>
  </div>
</template>

<style scoped>
@font-face {
    font-family: "Valorant";
    src: local("Valorant"),
     url(~assets/fonts/ValorantFont.ttf) format("truetype");
}

#app {
  /* position: absolute;
  top: 0;
  left: 0; */
  height: 100%;
  width: 100%;
}
</style>