import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import RoomPage from "@/views/RoomPage.vue";
import HomePage from "@/views/HomePage.vue";

const routes = [
    {
        path: "/",
        component: RoomPage,
    },
    {
        path: "/home",
        component: HomePage
    },
];

const router = new VueRouter({ routes });

export default router;
