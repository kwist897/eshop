<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type Product from '@/model/Product';
import apiService from '@/service/ApiService';
import type CatalogFilter from '@/model/CatalogFilter';
import type FormOrder from '@/model/FormOrder';
import { useToast } from 'primevue/usetoast';
import type Category from '@/model/Category';

const props = defineProps({
    category: { type: String, required: true },
    searchName: { type: String, required: false }
})

const products = ref([] as Product[])
const filteredProducts = ref([] as Product[])
const filter = ref({} as CatalogFilter)
const price = ref([] as number[])
const min = ref(0)
const max = ref(0)
const search = ref('')
const buyDialog = ref(false)
const orderForm = ref({} as FormOrder)
const toast = useToast();
const categories = ref({} as Category[])
const currentCategory = ref({} as Category | null)

onMounted(async () => {
    filter.value.category = props.category
    products.value = await apiService.getCatalogByFilter(filter.value);
    min.value = Math.min(...products.value.map(p => p.price))
    max.value = Math.max(...products.value.map(p => p.price))
    price.value = [min.value, max.value] as number[]
    if (props.searchName) {
        products.value = products.value.filter(p => p.name.toLocaleLowerCase().includes(props.searchName!.toLocaleLowerCase()))
    }
    filteredProducts.value = products.value


    categories.value = await apiService.getCategories();

    currentCategory.value = apiService.findCategory(categories.value, props.category)
})

watch(price, (newPrice) => {
    filter.value.priceMin = newPrice[0]
    filter.value.priceMax = newPrice[1];
})

watch(search, (newSearch) => {
    filter.value.name = newSearch
})

watch(filter, (newFilter) => {
    filteredProducts.value = products.value
        .filter(p => {
            if (newFilter.priceMax && newFilter.priceMin) {
                return p.price >= newFilter.priceMin && p.price <= newFilter.priceMax
            } else if (newFilter.priceMin) {
                return p.price >= newFilter.priceMin
            } else if (newFilter.priceMax) {
                return p.price <= newFilter.priceMax
            } else {
                return true;
            }
        })
        .filter(p => {
            if (newFilter.name) {
                return p.name.toLocaleLowerCase().includes(newFilter.name.toLocaleLowerCase())
            }
            return true;
        })
},
    { deep: true }
)

const send = () => {
    toast.add({
        severity: 'success',
        summary: `Дорогой ${orderForm.value.name}, заявка успешно оформлена!`,
        detail: 'Мы получили ваше обращение, дождитесь обратной связи',
        life: 10000
    })
    buyDialog.value = !buyDialog.value

}

const layout = ref('grid' as "grid" | "list" | undefined);
</script>
<template>
    <div class="h-full w-full flex flex-column align-items-center py-8">
        <Dialog v-model:visible="buyDialog" modal header="Оставьте заявку" :style="{ width: '50vw' }">
            <div
                class="card flex flex-column justify-content-center align-items-center align-content-center text-center gap-3">
                <div class="p-inputgroup flex-1">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                    <InputText placeholder="Имя" v-model="orderForm.name" />
                </div>

                <div class="p-inputgroup flex-1">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-shopping-bag"></i>
                    </span>
                    <InputText placeholder="Товары, интересущие вас" v-model="orderForm.products" />
                </div>

                <div class="p-inputgroup flex-1">
                    <span class="p-inputgroup-addon">@</span>
                    <InputText placeholder="Ваша почта" v-model="orderForm.email" />
                </div>

                <Button label="Отправить" @click="send()" />
            </div>
        </Dialog>
        <div class="pb-5">
            <span class="text-5xl">Товары категории: {{ currentCategory?.label }}</span>
        </div>
        <div class="card col-8">
            <DataView :value="filteredProducts" :layout="layout" paginator :rows="6" :dataKey="'name'">
                <template #header>
                    <div class="flex justify-content-between align-items-center">
                        <div class="flex gap-3 justify-content-around">
                            <div
                                class="card flex flex-column justify-content-center align-items-center gap-3 align-content-start">
                                <div class="flex justify-content-center align-items-start gap-3">
                                    <InputText :value="price[0]" class="w-4" :max="max" :min="min" />
                                    <InputText :value="price[1]" class="w-4" :max="max" :min="min" />
                                </div>
                                <Slider v-model="price" range class="w-14rem" :min="min" :max="max" />
                            </div>
                            <div class="flex flex-auto justify-content-center, align-items-center w-full">
                                <span class="p-input-icon-left w-full">
                                    <i class="pi pi-search" />
                                    <InputText v-model="search" placeholder="Search" class="w-full" />
                                </span>
                            </div>
                        </div>
                        <DataViewLayoutOptions v-model="layout" />
                    </div>
                </template>
                <template #list="slotProps">
                    <div class="col-12">
                        <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                            <img class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                                :src="import.meta.env.BASE_URL + `/images/${slotProps.data.img}`" :alt="slotProps.data.name" />
                            <div
                                class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4 w-8">
                                <div class="flex flex-column align-items-center sm:align-items-start flex-grow-0 gap-3 w-8">
                                    <div
                                        class="text-2xl font-bold overflow-hidden white-space-nowrap text-overflow-ellipsis w-full">
                                        {{ slotProps.data.name }}</div>
                                    <div
                                        class="text-xl font-light overflow-hidden white-space-nowrap text-overflow-ellipsis w-full">
                                        {{ slotProps.data.description }}</div>
                                    <Rating v-model="slotProps.data.rating" :cancel="false" readonly></Rating>
                                    <div class="flex align-items-center gap-3">
                                        <span class="flex align-items-center gap-2">
                                            <i class="pi pi-tag"></i>
                                            <span class="font-semibold">{{ slotProps.data.category }}</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                    <span class="text-2xl font-semibold">₽{{ slotProps.data.price }}</span>
                                    <Button icon="pi pi-shopping-cart" rounded @click="buyDialog = !buyDialog"></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
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
                                <img class="w-9 shadow-2 border-round" :src="import.meta.env.BASE_URL + `/images/${slotProps.data.img}`"
                                    :alt="slotProps.data.name" />
                                <div
                                    class="text-2xl font-bold overflow-hidden white-space-nowrap text-overflow-ellipsis w-full">
                                    {{ slotProps.data.name }}</div>
                                <div
                                    class="text-xl font-light overflow-hidden white-space-nowrap text-overflow-ellipsis w-full">
                                    {{ slotProps.data.description }}</div>
                                <Rating v-model="slotProps.data.rating" :cancel="false" readonly></Rating>
                            </div>
                            <div class="flex align-items-center justify-content-between">
                                <span class="text-2xl font-semibold">₽{{ slotProps.data.price }}</span>
                                <Button icon="pi pi-shopping-cart" rounded @click="buyDialog = !buyDialog"></Button>
                            </div>
                        </div>
                    </div>
                </template>
            </DataView>
        </div>
    </div>
</template>