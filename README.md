vue3 版本的jsmind 插件

# vue3-jsmind
A Vue3 Component ( base on jsmind )


# Install
```bash
yarn add vue3-jsmind #or npm install vue3-jsmind
```
# Quick Start
```js
import { createApp } from 'vue'
import App from './App.vue'
import { Mind } from 'vue3-jsmind'
const app = createApp(App);
app.component('jsMind',Mind).mount('#app')
```
# Use
```html
<js-mind :values="mind" :options="options" ref="jsMind" height="1000px"></js-mind>
```
