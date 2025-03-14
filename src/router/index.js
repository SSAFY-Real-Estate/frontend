import MainView from "@/views/MainView.vue";
import StartView from "@/views/StartView.vue";
import { createRouter, createWebHistory } from "vue-router";
import BoardListView from "@/views/BoardListView.vue";
import BoardDetailView from "@/views/BoardDetailView.vue";
import My from '@/views/My.vue'
import PutHouseDetailView from '@/views/PutHouseDetailView.vue'
import PutHouseListView from '@/views/PutHouseListView.vue'
import PutHouseWrite from '@/views/PutHouseWrite.vue'
import Zzim from '@/views/Zzim.vue'
import BoardWriteView from "@/views/BoardWriteView.vue";
import BoardUpdateView from "@/views/BoardUpdateView.vue";
import NoticeDetail from "@/views/NoticeDetail.vue";
import NoticeList from "@/views/NoticeList.vue";
import NoticeWrite from "@/views/NoticeWrite.vue";
import NoticeUpdate from "@/views/NoticeUpdate.vue";
import MapView from "@/views/MapView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "start",
      component: StartView,
    },
    {
      path: "/main",
      name: "main",
      component: MainView,
    },
    {
      path: "/puthouse",
      name: "puthouse",
      component: PutHouseListView,
    },
    {
      path: "/board",
      name: "board",
      component: BoardListView,
    },
    {
      path: "/board/:boardId",
      name: "detail",
      component: BoardDetailView,
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
    },
    {
      path: '/my',
      name: 'my',
      component: My,
    },
    {
      path: '/zzim',
      name: 'zzim',
      component: Zzim,
    },
    {
      path: '/board/update/:boardId',
      name: 'boardUpdate',
      component: BoardUpdateView,
    },
    {
      path: '/board/write',
      name: 'boardWrite',
      component: BoardWriteView
    },
    {
      path: '/notice/:noticeId',
      name: 'noticeDetail',
      component: NoticeDetail
    },
    {
      path: '/notice',
      name: 'noticeList',
      component: NoticeList
    },
    {
      path: '/notice/write',
      name: 'noticeWrite',
      component: NoticeWrite
    },
    {
      path: '/notice/update/:noticeId',
      name: 'noticeUpdate',
      component: NoticeUpdate
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    }
  ],
});

export default router;
