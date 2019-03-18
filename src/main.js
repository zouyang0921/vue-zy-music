import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import './assets/style/index.less'

FastClick.attach(document.body)

Vue.use(VueRouter)

Vue.use(VueLazyload)

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
