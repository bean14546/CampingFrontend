import Vue from "vue";
import VueRouter from "vue-router";

import FrontendLayout from "../layout/FrontendLayout/Frontend_Layout_Before_Login/Frontend.vue";
import Home from "../views/Frontend/FrontendViewsBeforeLogin/Home.vue";
import About from "../views/Frontend/FrontendViewsBeforeLogin/About.vue";
import Signup from "../views/Frontend/FrontendViewsBeforeLogin/Signup.vue";
import Signin from "../views/Frontend/FrontendViewsBeforeLogin/Signin.vue";

import FrontendLayoutAfterLogin from "../layout/FrontendLayout/Frontend_Layout_After_Login/FrontendAfterLogin.vue";
import Product from "../views/Frontend/FrontendViewsAfterLogin/Product.vue";
import Tent from "../views/Frontend/FrontendViewsAfterLogin/Category/Tents.vue";
import Accessories from "../views/Frontend/FrontendViewsAfterLogin/Category/Accessories.vue";
import Bedding from "../views/Frontend/FrontendViewsAfterLogin/Category/Bedding.vue";
import Clothing from "../views/Frontend/FrontendViewsAfterLogin/Category/Clothing.vue";
import Cart from "../views/Frontend/FrontendViewsAfterLogin/Cart.vue";

import Backend from "../layout/BackendLayout/Backend.vue";
import Dashboard from "@/views/Backend/Dashboard.vue";
import User from "@/views/Backend/User.vue";
import ProductAdmin from "@/views/Backend/Product.vue";
import Order from "@/views/Backend/Order.vue";

import NotFound from "@/views/NotFound.vue";

function authGuard(to, from, next) {
  let authen = false;
  if (localStorage.getItem("user")) {
    authen = true;
  } else {
    authen = false;
  }

  if (authen) {
    next();
  } else {
    next({ name: "Signin" });
  }
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: FrontendLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
        meta: {
          title: "Home",
        },
      },

      {
        path: "about",
        name: "About",
        component: About,
        meta: {
          title: "About",
        },
      },
      {
        path: "signup",
        name: "Signup",
        component: Signup,
        meta: {
          title: "Signup",
        },
      },
      {
        path: "signin",
        name: "Signin",
        component: Signin,
        meta: {
          title: "Signin",
        },
      },
    ],
  },
  {
    path: "/frontend",
    name: "FrontendLayoutAfterLogin",
    component: FrontendLayoutAfterLogin,
    beforeEnter: authGuard,
    children: [
      {
        path: "product",
        name: "ProductProductFrontend",
        component: Product,
        meta: {
          title: "Products",
        },
      },
      {
        path: "tent",
        name: "Tent",
        component: Tent,
        meta: {
          title: "Tents",
        },
      },
      {
        path: "accessories",
        name: "Accessories",
        component: Accessories,
        meta: {
          title: "Accessories",
        },
      },
      {
        path: "bedding",
        name: "Bedding",
        component: Bedding,
        meta: {
          title: "Bedding",
        },
      },
      {
        path: "clothing",
        name: "Clothing",
        component: Clothing,
        meta: {
          title: "Clothing",
        },
      },
      {
        path: "cart",
        name: "Cart",
        component: Cart,
        meta: {
          title: "Cart",
        },
      },
    ],
  },
  {
    path: "/backend",
    name: "Backend",
    component: Backend,
    beforeEnter: authGuard,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          title: "Dashboard",
        },
      },
      {
        path: "product",
        name: "ProductBackend",
        component: ProductAdmin,
        meta: {
          title: "Products",
        },
      },
      {
        path: "user",
        name: "User",
        component: User,
        meta: {
          title: "User",
        },
      },
      {
        path: "order",
        name: "Order",
        component: Order,
        meta: {
          title: "Oder",
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "Not Found",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
