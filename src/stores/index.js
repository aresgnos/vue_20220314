import { createStore } from 'vuex';

export default createStore({

    // 상태변수
    state : {
        logged : false,
    },
    
    // getters (값을 가지고 가는 것) => App.vue가 내용을 실시간으로 읽음
    getters : {
        getLogged(state){
            return state.logged;
        }
    },

    // mutations (내용을 바꿈)
    // Login.vue, Logout.vue에서 사용, value는 true(로그인) or false(로그아웃)
    mutations : {
        setLogged(state, value){
            state.logged = value;
        }
    }
    
    // actions



});