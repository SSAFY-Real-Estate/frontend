import MainView from '@/views/MainView.vue'
import PutHouseDetailView from '@/views/PutHouseDetailView.vue'
import PutHouseListView from '@/views/PutHouseListView.vue'
import PutHouseWrite from '@/views/PutHouseWrite.vue'
import StartView from '@/views/StartView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView,
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
    },
    {
      path: '/puthouse',
      name: 'puthouse',
      component: PutHouseListView,
    },
    {
      path: '/puthouse/:puthouseid',
      name: 'puthouseDetail',
      component: PutHouseDetailView,
      props: true
    },
    {
      path: '/puthouse/posts',
      name: 'puthousePosts',
      component: PutHouseWrite
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
