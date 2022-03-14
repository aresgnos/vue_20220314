import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/components/Home';
import Login from '@/components/Login';
import Join from '@/components/Join';
import Mypage from '@/components/Mypage';

const routes = [
    { path : '/', redirect:'/home'},
    { path : '/home', name:'Home', component:Home },
    { path : '/login', name:'Login', component:Login },
    { path : '/join', name:'Join', component:Join },
    { path : '/mypage', name:'Mypage', component:Mypage },
];

const router = createRouter(
    { history : createWebHashHistory(), routes : routes }
);

export default router;