import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Home = import("@/components/Home.vue");

const routes = [
    {
        path: "/",
        component: Home,
    },
];

const router = new VueRouter({ routes });

export default router;
