import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css';
import { List, PullRefresh, Grid, GridItem,Popup, AddressEdit, AddressList, Icon, SubmitBar, SwipeCell, Stepper, Checkbox, CheckboxGroup, Form, Field, Tag, Button, Swipe, SwipeItem, Lazyload, Badge, Sidebar, SidebarItem, Collapse, CollapseItem,  Tab, Tabs, Card, Image as VanImage   } from 'vant';

Vue.use(Swipe);
Vue.use(Popup);
Vue.use(Grid);
Vue.use(PullRefresh);
Vue.use(GridItem);
Vue.use(SwipeItem);
Vue.use(Icon);Vue.use(AddressList);
Vue.use(AddressEdit);
Vue.use(SubmitBar);
Vue.use(Badge);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(List);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Tab);
Vue.use(Tag);
Vue.use(Button);
Vue.use(Tabs);
Vue.use(Card);
Vue.use(Form);
Vue.use(SwipeCell);
Vue.use(Field);
Vue.use(Stepper);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(VanImage);
Vue.use(Lazyload, {
  loading: require('./assets/img/home/jia.gif'),
  preload: 1.3,
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
