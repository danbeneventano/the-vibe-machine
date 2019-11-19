import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router'
import VueFriendlyIframe from 'vue-friendly-iframe';
import itemMap from "./data/database";
import {Categories} from "./data/categories";
import FrameHolder from "./components/FrameHolder";

Vue.use(VueRouter)

Vue.component('vue-friendly-iframe', VueFriendlyIframe);

Vue.config.productionTip = false

const randomHash = [...itemMap.keys()][0]

const routes = [
    { path: '/:hash',
        component: FrameHolder,
        props: (route) => {
            return { item: itemMap.get(Number(route.params.hash)) }
        }
    },
    { path: '', redirect: `/${randomHash}` },
    { path: '*', redirect: '' }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    let query
    if (Object.entries(to.query).length === 0 && to.query.constructor === Object) {
        const cats = Object.values(Categories)
        query = { categories: cats.join('+') }
    }
    if (to.params.hash && !itemMap.get(Number(to.params.hash))) {
        if (query) next({ path: "/", query: query })
        else next("/")
    } else {
        if (query) next({ query: query })
        else next()
    }
})

new Vue({
    router,
    vuetify,
    render: h => h(App),
    data() {
        return {
            loading: true,
            fullscreen: false,
            selectedIndex: 0,
            selectedCategories: this.$route.query.categories ? this.$route.query.categories.split("+") : Object.values(Categories)
        }
    },
    methods: {
        next() {
            const orig = this.selectedIndex
            this.selectedIndex++
            if (this.selectedIndex === itemMap.size) this.selectedIndex = 0
            while (!this.selectedCategories.includes([...itemMap.values()][this.selectedIndex].type)) {
                this.selectedIndex++
                if (this.selectedIndex === itemMap.size) this.selectedIndex = 0
            }
            if (this.selectedIndex !== orig) {
                this.$router.push({ path: `/${[...itemMap.keys()][this.selectedIndex]}`, query: this.$route.query })
            }
        },
        back() {
            const orig = this.selectedIndex
            this.selectedIndex--
            if (this.selectedIndex === -1) this.selectedIndex = itemMap.size - 1
            while (!this.selectedCategories.includes([...itemMap.values()][this.selectedIndex].type)) {
                this.selectedIndex--
                if (this.selectedIndex === -1) this.selectedIndex = itemMap.size - 1
            }
            if (this.selectedIndex !== orig) {
                this.$router.push({ path: `/${[...itemMap.keys()][this.selectedIndex]}`, query: this.$route.query })
            }
        }
    }
}).$mount('#app')
