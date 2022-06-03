import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import RoomPage from "@/views/RoomPage.vue";

const routes = [
    {
        path: "/",
        component: RoomPage,
    },
];

const router = new VueRouter({ routes });

export default router;
