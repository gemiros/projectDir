<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
useRouter().push('/')
window.onload = function () {
}
</script>

<template>
  <RouterLink to="/">一覧へ</RouterLink>
  <router-view />
</template>


<style>
body {
  margin: 10px;
  min-width: 950px;
  width: 100%;
}
</style>