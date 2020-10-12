import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Clipboard from "v-clipboard";
import InfiniteScroll from "v-infinite-scroll";
Vue.use(Clipboard);
Vue.use(InfiniteScroll);
new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
