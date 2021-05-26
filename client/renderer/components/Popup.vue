<template>
  <div>
    <transition name="fade">
      <div v-show="toggle" class="flex items-start fixed top-0 left-0 w-full h-full overflow-visible bg-valblack bg-opacity-70">
        <div class="flex flex-col items-center text-center max-w-lg z-1 rounded-lg mx-auto my-auto py-4 px-8 bg-valbeige">
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    toggle: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="postcss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>