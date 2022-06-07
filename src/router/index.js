import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import RoomPage from "@/views/RoomPage.vue";
import HomePage from "@/views/HomePage.vue";

const routes = [
	{
		name: "home",
        path: "/",
        component: HomePage
    },
    {
		name: "room",
        path: "/room/:id_room",
        component: RoomPage,
		props: true
    },
];

const router = new VueRouter({
	routes,
	mode: 'history',
});

export default router;
