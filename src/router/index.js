import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Home from '../views/layout/components/Home.vue';
import Login from '../views/layout/components/Login.vue';
import getMenuRouter from '../utils/permission';

Vue.use(VueRouter);
const asyncRouterMap = [
  {
    path: '/product',
    name: 'Product',
    component: Home,
    meta: {
      title: '商品',
      hidden: false,
      icon: 'inbox',
    },
    children: [
      {
        path: '/productAdd',
        name: 'ProductAdd',
        meta: {
          title: '添加商品',
          hidden: false,
          icon: 'file-add',
        },
        component: () => import('../views/page/productAdd.vue'),
      },
      {
        path: '/category',
        name: 'Category',
        meta: {
          title: '类目管理',
          hidden: true,
          icon: 'project',

        },
        component: () => import('../views/page/category.vue'),
      },
      {
        path: '/productList',
        name: 'ProductList',
        meta: {
          title: '商品列表',
          hidden: false,
          icon: 'unordered-list',

        },
        component: () => import('../views/page/productList.vue'),
      },
      {
        path: '/edit/:id',
        name: 'ProductEdit',
        meta: {
          title: '编辑商品',
          hidden: true,
          icon: 'file-add',

        },
        component: () => import('../views/page/productAdd.vue'),
      },

    ],
  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',

    },
    children: [{
      path: 'index',
      name: 'Index',
      component: () => import('../views/page/index.vue'),
      meta: {
        title: '统计',
        hidden: false,
        icon: 'number',

      },
    }],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登陆',
      hidden: true,

    },
  },
];

const router = new VueRouter({
  routes,
});
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.username && store.state.user.appkey && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRouters = getMenuRouter(store.state.user.role, asyncRouterMap);
        store.dispatch('changeMenuRoutes', routes.concat(menuRouters)).then(() => {
          router.addRoutes(menuRouters);
          next();
        });

        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});

export default router;
