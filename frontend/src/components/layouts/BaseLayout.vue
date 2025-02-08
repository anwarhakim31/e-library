<template>
  <Header />
  <div class="pt-16">
    <router-view></router-view>
  </div>
  <Footer />
</template>

<script lang="ts" setup>
import Footer from "../fragments/Footer.vue";
import Header from "../fragments/Header.vue";
</script>

<style></style>
