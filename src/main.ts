import { createApp } from 'vue'
import App from './App.vue'
import jsMind from '../dist/build.es'
const app = createApp(App);
app.component('jsMind',jsMind).mount('#app')
