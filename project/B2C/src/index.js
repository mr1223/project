




import Vue from 'vue';
import VueRouter from 'vue-router';
import store from 'common/store';
import router from 'src/router.js';
import Mock from './mock/mock';

import 'static/css/reset.css';


Mock.mockData();
const app = new Vue({
	store,
  	router
}).$mount('#app')



