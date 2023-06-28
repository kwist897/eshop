<script setup lang="ts">
import { onMounted, ref } from 'vue'
import apiService from '@/service/ApiService';
import type CatalogFilter from '@/model/CatalogFilter';
import type Product from '@/model/Product';
import type FormOrder from '@/model/FormOrder';
import { useToast } from 'primevue/usetoast';

const layout = ref('grid' as "grid");
const products = ref([] as Product[]);
const imageUrl = ref(import.meta.env.BASE_URL + "images")
const buyDialog = ref(false)
const orderForm = ref({} as FormOrder)
const toast = useToast();

onMounted(async () => {
  const filter: CatalogFilter = {
    category: 'All'
  }
  products.value = (await (apiService.getCatalogByFilter(filter))).slice(0, 3)
})

const send = () => {
  toast.add({
    severity: 'success',
    summary: `Дорогой ${orderForm.value.name}, заявка успешно оформлена!`,
    detail: 'Мы получили ваше обращение, дождитесь обратной связи',
    life: 10000
  })
  buyDialog.value = !buyDialog.value
}
</script>

<template>
  <div class="h-full w-full flex flex-column align-items-center py-8">
    <div class="card col-7">
      <div class="pb-5 text-center">
        <span class="text-2xl">Избранные товары</span>
      </div>
      <DataView :value="products" :layout="layout" :dataKey="'name'">
        <template #grid="slotProps">
          <div class="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
            <div class="p-4 border-1 surface-border surface-card border-round">
              <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <div class="flex align-items-center gap-2">
                  <i class="pi pi-tag"></i>
                  <span class="font-semibold">{{ slotProps.data.category }}</span>
                </div>
              </div>
              <div class="flex flex-column align-items-center gap-3 py-5 text-center">
                <img class="w-9 shadow-2 border-round" :src="`${imageUrl}/${slotProps.data.img}`"
                  :alt="slotProps.data.name" />
                <div class="text-lg font-bold overflow-hidden white-space-nowrap text-overflow-ellipsis w-full">{{
                  slotProps.data.name }}</div>
                <div class="font-light overflow-hidden white-space-nowrap text-overflow-ellipsis w-full">{{
                  slotProps.data.description }}</div>
                <Rating v-model="slotProps.data.rating" :cancel="false" readonly></Rating>
              </div>
              <div class="flex align-items-center justify-content-between">
                <span class="text-lg font-semibold">₽{{ slotProps.data.price }}</span>
                <Button icon="pi pi-shopping-cart" rounded></Button>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </div>
</template>
