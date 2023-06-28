<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue';
</script>

<template>
  <div class="flex flex-column h-screen overflow-x-hidden overflow-y-auto">
    <Toast />
    <HeaderComponent></HeaderComponent>
    <div class="flex-1">
      <RouterView :key="$route.fullPath"/>
    </div>
  </div>
</template>
