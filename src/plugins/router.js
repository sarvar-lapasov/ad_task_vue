import { createRouter, createWebHistory } from "vue-router";

const routes = [{
        path: "/",
        component: () =>
            import ("@/pages/HomePage.vue"),
        name: "Home",
    },
    {
        path: "/ad-info/:adId",
        component: () =>
            import ("@/pages/AdInfoPage.vue"),
        name: "adInfo",
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});