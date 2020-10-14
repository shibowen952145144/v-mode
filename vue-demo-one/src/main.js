import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
    // 引入公共样式
import './styles/base.less'
// 自动适配所有屏幕
import 'lib-flexible'
new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app')