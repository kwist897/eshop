/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import router from './router'
import InputText from 'primevue/inputtext';
import Divider from 'primevue/divider';
import TieredMenu from 'primevue/tieredmenu';
import Button from 'primevue/button';
import Tree from 'primevue/tree'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Rating from 'primevue/rating'
import OverlayPanel from 'primevue/overlaypanel'
import DataView from 'primevue/dataview';
import Slider from 'primevue/slider'
import InputNumber from 'primevue/inputnumber'
import Toast from 'primevue/toast';
import Dialog from 'primevue/dialog';
import ToastService from 'primevue/toastservice';

import '@/assets/main.css';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const app = createApp(App)

app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ToastService);

app.component('InputText', InputText)
app.component('Button', Button)
app.component('Divider', Divider)
app.component('Slider', Slider )
app.component('Dialog', Dialog)
app.component('InputNumber', InputNumber)
app.component('Toast', Toast)
app.component('Tree', Tree)
app.component('Rating', Rating)
app.component('DataViewLayoutOptions', DataViewLayoutOptions)
app.component('OverlayPanel', OverlayPanel)
app.component('TieredMenu', TieredMenu)
app.component('DataView', DataView)

app.mount('#app')
