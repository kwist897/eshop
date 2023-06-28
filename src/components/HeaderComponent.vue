<script setup lang="ts">
import router from '@/router'
import { onMounted, ref } from 'vue'
import type Category from '@/model/Category'
import apiService from '@/service/ApiService'
import type TreeSelectionKeys from 'primevue/tree'

const selectedKey = ref(undefined as TreeSelectionKeys | undefined);
const search = ref("");
const op = ref();
const items = ref([] as Category[])

onMounted(async () => {
    items.value = await apiService.getCategories()
})

const toggle = (event: any) => {
    op.value.toggle(event)
};

const resolve = (category: Category) => {
    router.push({ name: 'catalog', params: { category: category.code } })
}

const searchByField = () => {
    router.push({ name: 'catalog', params: { category: 'All', searchName: search.value } })
}
</script>
<template>
    <div class="flex gap-5 px-8 shadow-2 flex-wrap">
        <div class="flex flex-wrap text-center justify-content-center align-items-center gap-5 col-4">
            <div class="flex-none">
                <h1 class="cursor-pointer" @click="router.push('/')">MagaShop</h1>
            </div>
            <div class="flex-none flex text-center justify-content-center align-items-center">
                <!-- <TieredMenu ref="menu" id="overlay_tmenu" :model="items" popup /> -->
                <Button class="no-outline w-full" icon="pi pi-list" label="Категории" @click="toggle"></Button>
                <OverlayPanel ref="op">
                    <Tree :value="items" class="border-none p-0" selectionMode="single" v-model:selectionKeys="selectedKey"
                        @node-select="e => resolve(e as any)" />
                </OverlayPanel>
            </div>
        </div>
        <div class="flex flex-shrink-1 justify-content-center align-items-center justify-content-around col-5">
            <span class="p-input-icon-left w-full">
                <i class="pi pi-search" />
                <InputText v-model="search" placeholder="Search" class="w-full" />
            </span>
            <Button icon="pi pi-search" @click="searchByField()"></Button>
        </div>
    </div>
</template>