import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "@/views/Home.vue";

const routes = [
    {
        path: "/",
        component: Home,
    },
];

const router = new VueRouter({ routes });

export default router;
