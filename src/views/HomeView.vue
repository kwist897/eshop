<script setup lang="ts">
import { onMounted, ref } from 'vue'
import json from '@/assets/catalog'
import Catalog from '@/model/Catalog'

const layout = ref('grid' as "grid");
const catalog = ref(json as Catalog)

const products = ref(catalog.value.products.slice(0, 3));
</script>

<template>
  <div class="h-full w-full flex flex-column align-items-center py-8">
    <div class="card col-8">
      <div class="pb-5 text-center">
        <span class="text-5xl">Избранные товары</span>
      </div>
      <DataView :value="products" :layout="layout">
        <template #grid="slotProps">
          <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
            <div class="p-4 border-1 surface-border surface-card border-round">
              <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <div class="flex align-items-center gap-2">
                  <i class="pi pi-tag"></i>
                  <span class="font-semibold">{{ slotProps.data.category }}</span>
                </div>
              </div>
              <div class="flex flex-column align-items-center gap-3 py-5">
                <img class="w-9 shadow-2 border-round" :src="`../src/assets/images/${slotProps.data.img}`"
                  :alt="slotProps.data.name" />
                <div class="text-2xl font-bold overflow-hidden white-space-nowrap text-overflow-ellipsis w-full">{{
                  slotProps.data.name }}</div>
                <div class="text-xl font-light overflow-hidden white-space-nowrap text-overflow-ellipsis w-full">{{
                  slotProps.data.description }}</div>
                <Rating v-model="slotProps.data.rating" :cancel="false" readonly ></Rating>
              </div>
              <div class="flex align-items-center justify-content-between">
                <span class="text-2xl font-semibold">₽{{ slotProps.data.price }}</span>
                <Button icon="pi pi-shopping-cart" rounded></Button>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </div></template>
