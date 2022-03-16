import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/components/Home';
import Login from '@/components/Login';
import Join from '@/components/Join';
import Mypage from '@/components/Mypage';
import Logout from '@/components/Logout';
import Chat from '@/components/Chat';
import Item from '@/components/Item';
import Admin from '@/components/Admin';
import Admin1 from '@/components/Admin1';

const routes = [
    { path : '/', redirect:'/home'},
    { path : '/home', name:'Home', component:Home },
    { path : '/login', name:'Login', component:Login },
    { path : '/join', name:'Join', component:Join },
    { path : '/mypage', name:'Mypage', component:Mypage },
    { path : '/logout', name:'Logout', component:Logout },
    { path : '/chat', name:'Chat', component:Chat },
    { path : '/item', name:'Item', component:Item },
    { path : '/admin', name:'Admin', component:Admin },
    { path : '/admin1', name:'Admin1', component:Admin1 },
];

const router = createRouter(
    { history : createWebHashHistory(), routes : routes }
);

export default router;