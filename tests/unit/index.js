import Vue from "vue";

// Global test configuration so that bootstrap components are automatically included and don't throw warnings/errors.

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;
