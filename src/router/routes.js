const routes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
];

export default routes;
