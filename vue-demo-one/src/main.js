import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
    // 引入公共样式
import './styles/base.less'
import './styles/iconfont.css'
// 自动适配所有屏幕
import 'lib-flexible'

// 引入子组件
import HmHeader from './components/HmHeader.vue'
// 注册全局组件
Vue.component('hm-header', HmHeader)
new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app')