<template>
  <div id="app">
    <router-view />
    <music-bar />
  </div>
</template>

<script>
import MusicBar from "@/components/MusicBar.vue";

export default {
  components: { MusicBar }
};
</script>

<style lang="stylus"></style>
